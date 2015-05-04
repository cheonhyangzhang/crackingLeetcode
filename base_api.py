import endpoints
import logging
from protorpc import remote
import datetime
from google.appengine.api import users
from google.appengine.api import oauth

client_ids = ['686946052664-ab0boq4mu1j76sb56dfiljr2tl175vro.apps.googleusercontent.com', endpoints.API_EXPLORER_CLIENT_ID]

# check_auth will throw exception if not valid auth
# only motorola account and specified service account could access this api
def check_auth(endpoints):
	user = endpoints.get_current_user()
	logging.debug("check_auth: " + str(user))
	if user is None:
		message = 'Unauthorized request: No account found'
		logging.debug("check_auth: " + str(message))
		raise endpoints.UnauthorizedException(message)
	else:
		try:
			user_email = user.email()
		except:
			logging.debug("check_auth: exception happens when checking the auth")
			message = 'Unauthorized request: Not a motorola account'
			raise endpoints.UnauthorizedException(message)



def check_admin(endpoints):
	user = endpoints.get_current_user()
	logging.debug("check_admin: " + str(user))
	if user is None:
		message = 'Unauthorized request: No account found'
		logging.debug("check_admin: " + str(message))
		raise endpoints.UnauthorizedException(message)
	else:
		try:
			user_email = user.email()
		except Exception as e:
			logging.debug(e)
			message = 'Unauthorized request'
			logging.debug("check_admin: Not Allowed  Exception happens when checking auth")
			raise endpoints.UnauthorizedException(message)


#defines permission only should be accessed by the developer
def check_app_admin(endpoints):
	user = endpoints.get_current_user()
	logging.debug("check_app_admin: " + str(user))
	if user is None:
		message = 'Unauthorized request: No account found'
		logging.debug("check_app_admin: " + str(message))
		raise endpoints.UnauthorizedException(message)
	else:
		try:
			pass
		except:
			message = 'Unauthorized request'
			logging.debug("check_app_admin: Not allowed " + str(message))
			raise endpoints.UnauthorizedException(message)

class MessageManager():
	@classmethod
	def dictToMessage(cls, messageType, d, keepTZ):
		logging.debug("dictToMessage")
		json_fields = []
		m = messageType()
		fields = messageType.all_fields()	
		logging.debug(d)
		for field in fields:
			logging.debug(field.name)
			if field.name in d:
				v = d[field.name]
				if field.name in json_fields:
					message_list = []
					# for message_dict in v:
					# 	im = cls.dictToMessage(InterviewerDetailMessage, json.loads(message_dict), False)
					# 	message_list.append(im)
					setattr(m, field.name, message_list)
					continue
				if type(v) == datetime.datetime:
					if keepTZ:
						v_cst_str = v.strftime("%Y-%m-%d")
					else:
						utc_zone = tz.gettz('UTC')
						cst_zone = tz.gettz('America/Chicago')
						v_utc = v.replace(tzinfo=utc_zone)
						v_cst = v_utc.astimezone(cst_zone)
						v_cst_str = v_cst.strftime("%Y-%m-%d")
						

					setattr(m, field.name, v_cst_str)
				else:
					setattr(m, field.name, d.get(field.name))

		return m

crackingleetcode_api = endpoints.api(name='crackingleetcode',version='v1', description='crackingleetcode endpoint api',allowed_client_ids=client_ids)
# crackingleetcode_api = endpoints.api(name='crackingleetcode',version='v1', description='crackingleetcode endpoint api')

