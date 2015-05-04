from base_api import crackingleetcode_api
from base_api import MessageManager
from protorpc import messages
from protorpc import message_types
from models.user_entity import UserEntity
from protorpc import remote
from random import randint
import endpoints
import logging


class UserMessage(messages.Message):
	main_lang = messages.StringField(1)
	solution_rating = messages.StringField(2)
	easy_solved = messages.StringField(3)
	medium_solved = messages.StringField(4)
	hard_solved = messages.StringField(5)
	email = messages.StringField(6)
class UserPatchMessage(messages.Message):
	email = messages.StringField(1)
	main_lang = messages.StringField(2)

class UserEmailMessage(messages.Message):
	email = messages.StringField(1)

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

		user_message =  MessageManager.dictToMessage(UserMessage, user.toDict(), False)
		logging.debug(user_message)	
		return user_message




