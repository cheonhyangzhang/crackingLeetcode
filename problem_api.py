from base_api import crackingleetcode_api
from protorpc import messages
from protorpc import message_types
from models.problem_entity import ProblemEntity
from models.problem_entity import SolutionEntity
from protorpc import remote
import endpoints
import logging

class ProblemMessage(messages.Message):
	no = messages.StringField(1)
	title = messages.StringField(2)
	tags = messages.StringField(3, repeated = True)
	description = messages.StringField(4)
	difficulty = messages.StringField(5)
	url = messages.StringField(6)

class NoMessage(messages.Message):
	no = messages.StringField(1)
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
class ListSolutionMessage(messages.Message):
	solutions = messages.MessageField(SolutionMessage, 1, repeated = True)
class ListProblemMessage(messages.Message):
	problems = messages.MessageField(ProblemMessage, 1, repeated = True)

class AccountIdMessage(messages.Message):
	account = messages.StringField(1)
class EmptyMessage(messages.Message):
	pass

@crackingleetcode_api.api_class(resource_name='problem')
class ProblemAPI(remote.Service):
	@endpoints.method(ProblemMessage, ProblemMessage,
		name='insert',
		path='problem/insert',
		http_method='POST'
		) 
	def problem_insert(self, request):
		logging.debug("problem_insert")
		problem = ProblemEntity(id = request.no,
								no = request.no,
								title = request.title,
								tags = request.tags,
								url = request.url,
								difficulty = request.difficulty,
								description = request.description 
			)
		problem.put()
		return request

	@endpoints.method(NoMessage, ProblemMessage,
		name='get',
		path='problem/get',
		http_method='GET'
		) 
	def problem_get(self, request):
		logging.debug("problem_get")
		problem = ProblemEntity.get_by_id(request.no)

		return ProblemMessage(
				no = problem.no,
				title = problem.title,
				tags = problem.tags,
				difficulty = problem.difficulty,
				url = problem.url,
				description = problem.description
			)
	@endpoints.method(EmptyMessage, ListProblemMessage,
		name='list',
		path='problem/list',
		http_method='GET'
		) 
	def problem_list(self, request):
		logging.debug("problem_list")
		qry = ProblemEntity.query()
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
		problem = ProblemEntity.get_by_id(request.no)
		logging.debug(problem)
		if problem:
			problem_title = problem.title
		else:
			problem_title = None
		logging.debug("problem_title")
		logging.debug(problem_title)
		solution = SolutionEntity(id = user_email + '-' + request.no,
								no = request.no,
								title = problem_title,
								solution = request.solution,
								analysis = request.analysis,
								tags = request.tags,
								difficulty = request.difficulty,
								time = request.time,
								owner = user_email,
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
		solution = SolutionEntity.get_by_id(request.no)
		logging.debug("problem_get")
		logging.debug(request)
		logging.debug(solution)
		return SolutionMessage(
				no=solution.no,
				title=solution.title,
				solution = solution.solution,
				analysis = solution.analysis,
				tags = solution.tags,
				difficulty = solution.difficulty,
				time = solution.time,
				owner = solution.owner,
				onmyself = solution.onmyself 
			)

	@endpoints.method(AccountIdMessage, ListSolutionMessage,
		name='list',
		path='solution/list',
		http_method='GET'
		) 
	def solution_list(self, request):
		logging.debug("solutions:")
		qry = SolutionEntity.query(SolutionEntity.owner ==request.account)
		solutions = qry.fetch()
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
					time = solution.time,
					owner = solution.owner,
					onmyself = solution.onmyself 
					)
				)
		return ListSolutionMessage(
									solutions = solutions_message
									)

