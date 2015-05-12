from base_api import crackingleetcode_api
from protorpc import messages
from protorpc import message_types
from models.problem_entity import ProblemEntity
from models.problem_entity import SolutionEntity
from protorpc import remote
from random import randint
import endpoints
import logging

class TypeMessage(messages.Message):
	atype = messages.StringField(1)
class UserEmailMessage(messages.Message):
	email = messages.StringField(1)

class ProblemMessage(messages.Message):
	no = messages.StringField(1)
	title = messages.StringField(2)
	tags = messages.StringField(3, repeated = True)
	description = messages.StringField(4)
	difficulty = messages.StringField(5)
	url = messages.StringField(6)
	atype = messages.StringField(7)

class NoMessage(messages.Message):
	no = messages.StringField(1)
	atype = messages.StringField(2)
	owner = messages.StringField(3)
class SolutionMessage(messages.Message):
	no = messages.StringField(1)
	title = messages.StringField(2)
	solution = messages.StringField(3)
	analysis = messages.StringField(4)
	tags = messages.StringField(5, repeated = True)
	difficulty = messages.StringField(6)
	time = messages.StringField(7)
	owner = messages.StringField(8)
	onmyself = messages.StringField(9)
	atype = messages.StringField(10)
	lang = messages.StringField(11)
	own_difficulty = messages.StringField(12)
class ListSolutionMessage(messages.Message):
	solutions = messages.MessageField(SolutionMessage, 1, repeated = True)
class ListProblemMessage(messages.Message):
	problems = messages.MessageField(ProblemMessage, 1, repeated = True)

class AccountIdMessage(messages.Message):
	account = messages.StringField(1)
	atype = messages.StringField(2)
class EmptyMessage(messages.Message):
	pass

class ProblemReminderMessage(messages.Message):
	no = messages.StringField(1)
	title = messages.StringField(2)
	onmyself = messages.StringField(3)
	atype = messages.StringField(4)


@crackingleetcode_api.api_class(resource_name='problem')
class ProblemAPI(remote.Service):
	@endpoints.method(ProblemMessage, ProblemMessage,
		name='insert',
		path='problem/insert',
		http_method='POST'
		) 
	def problem_insert(self, request):
		logging.debug("problem_insert")
		logging.debug(request)
		problem = ProblemEntity(id = request.atype + "-" + request.no,
								no = request.no,
								title = request.title,
								tags = request.tags,
								url = request.url,
								difficulty = request.difficulty,
								description = request.description,
								atype = request.atype
			)
		problem.put()
		return request

	@endpoints.method(EmptyMessage, ProblemReminderMessage,
		name='reminder',
		path='problem/reminder',
		http_method='GET'
		) 
	def problem_reminder(self, request):
		logging.debug("problem_reminder")
		logging.debug(request)
		qry = SolutionEntity.query()
		# qry = SolutionEntity.query(SolutionEntity.onmyself == 'No')
		solutions = qry.fetch()

		total = len(solutions)
		pick = randint(0, total -1) # inclusive
		solution = solutions[pick]	


		return ProblemReminderMessage(
				no = solution.no,
				title = solution.title,
				onmyself = solution.onmyself,
				atype = solution.atype
			)

	@endpoints.method(NoMessage, ProblemMessage,
		name='get',
		path='problem/get',
		http_method='GET'
		) 
	def problem_get(self, request):
		logging.debug("problem_get")
		logging.debug(request)
		problem = ProblemEntity.get_by_id(request.atype + '-' + request.no)

		return ProblemMessage(
				no = problem.no,
				title = problem.title,
				tags = problem.tags,
				difficulty = problem.difficulty,
				url = problem.url,
				description = problem.description,
				atype = problem.atype
			)
	@endpoints.method(TypeMessage, ListProblemMessage,
		name='list',
		path='problem/list',
		http_method='GET'
		) 
	def problem_list(self, request):
		logging.debug("problem_list")
		qry = ProblemEntity.query(ProblemEntity.atype == request.atype)
		problems = qry.fetch()
		problems_message = []
		for problem in problems:
			problems_message.append(
				ProblemMessage(
					no=problem.no,
					title=problem.title,
					tags = problem.tags,
					difficulty = problem.difficulty,
					description = problem.description,
					url = problem.url,
					)
				)

		return ListProblemMessage(
				problems = problems_message
			)

@crackingleetcode_api.api_class(resource_name='solution')
class SolutionAPI(remote.Service):
	@endpoints.method(SolutionMessage, SolutionMessage,
		name='insert',
		path='solution/insert',
		http_method='POST'
		) 
	def solution_insert(self, request):
		logging.debug("solution_insert")
		logging.debug(request)
		user = endpoints.get_current_user()
		user_email = user.email()
		user_id = user_email.split('@')[0]
		logging.debug(user)
		problem = ProblemEntity.get_by_id(request.atype + '-' + request.no)
		logging.debug(problem)
		if problem:
			problem_title = problem.title
		else:
			problem_title = None
		logging.debug("problem_title")
		logging.debug(problem_title)
		solution = SolutionEntity(id = user_email + '-' + request.atype + '-' + request.no,
								no = request.no,
								title = problem_title,
								atype = request.atype,
								solution = request.solution,
								analysis = request.analysis,
								tags = request.tags,
								difficulty = request.difficulty,
								own_difficulty = request.own_difficulty,
								time = request.time,
								owner = user_email,
								lang = request.lang,
								onmyself = request.onmyself 
			)
		solution.put()
		return request
	@endpoints.method(NoMessage, SolutionMessage,
		name='get',
		path='solution/get',
		http_method='GET'
		) 
	def solution_get(self, request):
		logging.debug("solution_get")
		logging.debug(request)
		user_email = request.owner
		solution = SolutionEntity.get_by_id(user_email + '-' + request.atype +'-'+ request.no)
		logging.debug(solution)
		if not solution:
			message = "Solution not found for " + request.no
			raise endpoints.NotFoundException(message)
		return SolutionMessage(
				no=solution.no,
				title=solution.title,
				solution = solution.solution,
				analysis = solution.analysis,
				tags = solution.tags,
				difficulty = solution.difficulty,
				own_difficulty = solution.own_difficulty,
				time = solution.time,
				owner = solution.owner,
				atype = solution.atype,
				lang = solution.lang,
				onmyself = solution.onmyself 
			)

	@endpoints.method(UserEmailMessage, EmptyMessage,
		name='batch',
		path='solution/batch',
		http_method='GET'
		) 
	def solution_batch(self, request):
		logging.debug("solutions_batch")
		qry = ProblemEntity.query()
		problems = qry.fetch()
		for problem in problems:
			solution = SolutionEntity.get_by_id(request.account+"-"+problem.atype+"-"+problem.no)
			if solution:
				solution.own_difficulty = solution.difficulty
				solution.difficulty = problem.difficulty
				test[solution.difficulty] +=1
				solution.put()
		return EmptyMessage()

	@endpoints.method(AccountIdMessage, ListSolutionMessage,
		name='list',
		path='solution/list',
		http_method='GET'
		) 
	def solution_list(self, request):
		logging.debug("solutions_list")
		logging.debug(request)
		logging.debug(request.account)
		qry = SolutionEntity.query(SolutionEntity.owner == request.account, SolutionEntity.atype == request.atype)
		# qry = SolutionEntity.query(SolutionEntity.owner == request.account)
		solutions = qry.fetch()
		logging.debug(solutions)
		solutions_message = []
		for solution in solutions:
			solutions_message.append(
				SolutionMessage(
					no=solution.no,
					title=solution.title,
					solution = solution.solution,
					analysis = solution.analysis,
					tags = solution.tags,
					difficulty = solution.difficulty,
					own_difficulty = solution.own_difficulty,
					time = solution.time,
					owner = solution.owner,
					lang = solution.lang,
					onmyself = solution.onmyself 
					)
				)
		return ListSolutionMessage(
									solutions = solutions_message
									)

