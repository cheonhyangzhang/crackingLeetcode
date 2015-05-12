from base_api import crackingleetcode_api
from base_api import MessageManager
from protorpc import messages
from protorpc import message_types
from models.user_entity import UserEntity
from models.problem_entity import SolutionEntity
from protorpc import remote
from random import randint
import json
import endpoints
import logging


class UserMessage(messages.Message):
	main_lang = messages.StringField(1)
	solution_rating = messages.StringField(2)
	sovled_statics = messages.StringField(3)
	email = messages.StringField(4)
	displayName = messages.StringField(5)
	avatar = messages.StringField(6)
class UserPatchMessage(messages.Message):
	email = messages.StringField(1)
	main_lang = messages.StringField(2)

class UserEmailMessage(messages.Message):
	email = messages.StringField(1)

class EmptyMessage(messages.Message):
	pass

class UserGetMessage(messages.Message):
	email = messages.StringField(1)
	displayName = messages.StringField(2)
	avatar = messages.StringField(3)

class UserListMessage(messages.Message):
	users = messages.MessageField(UserMessage, 1, repeated = True)

@crackingleetcode_api.api_class(resource_name='user')
class UserAPI(remote.Service):
	@endpoints.method(UserPatchMessage, UserMessage,
		name='patch',
		path='user/patch',
		http_method='POST'
		) 
	def user_patch(self, request):
		logging.debug("user.patch")
		user = UserEntity.get_by_id(request.email)
		if not user:
			user = UserEntity(
				id = request.email,
				email = request.email
				)
		user.main_lang = request.main_lang
		user.put()
		return MessageManager.dictToMessage(UserMessage, user.toDict(),  False)

	@endpoints.method(UserEmailMessage, UserMessage,
		name='count',
		path='user/count',
		http_method='GET'
		) 
	def user_count(self, request):
		logging.debug("user.count")
		user = UserEntity.get_by_id(request.email)
		if not user:
			user = UserEntity(
				id = request.email,
				email = request.email
				)
		qry = SolutionEntity.query(SolutionEntity.owner == request.email)

		sovled_statics = {}
		solutions = qry.fetch()
		for atype in ['algorithms']:
			sovled_statics[atype] = {'Easy':0,'Medium':0, 'Hard':0, 'Total':0}
		for solution in solutions:
			atype = solution.atype	
			sovled_statics[atype][solution.difficulty] += 1
			sovled_statics[atype]['Total'] += 1
		user.sovled_statics = json.dumps(sovled_statics)
		user.put()
		return MessageManager.dictToMessage(UserMessage, user.toDict(),  False)

	@endpoints.method(UserGetMessage, UserMessage,
		name='get',
		path='user/get',
		http_method='POST'
		) 
	def user_get(self, request):
		logging.debug("user.get")
		logging.debug(request)
		user = UserEntity.get_by_id(request.email)
		logging.debug(user)
		if not user:
			user = UserEntity(
				id = request.email,
				email = request.email
				)
			user.put()
		changed = False
		if request.displayName:
			changed = True
			user.displayName = request.displayName
		if request.avatar:
			changed = True
			user.avatar = request.avatar
		if changed:
			user.put()
		user_message =  MessageManager.dictToMessage(UserMessage, user.toDict(), False)
		logging.debug(user_message)	
		return user_message

	@endpoints.method(EmptyMessage, UserListMessage,
		name='list',
		path='user/list',
		http_method='GET'
		) 
	def user_list(self, request):
		logging.debug("user.list")
		qry = UserEntity.query()
		users = qry.fetch()
		users_message = []
		for user in users:
			users_message.append(MessageManager.dictToMessage(UserMessage, user.toDict(), False))
		return UserListMessage(users = users_message)




