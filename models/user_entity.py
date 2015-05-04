# !/usr/bin/env python

"""
	Model definition for User entity
"""

__author__ = 'Tianxiang Zhang'
__email__='cenhiangapply@gmail.com'

from google.appengine.ext import ndb
import endpoints
import logging
import json
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from models.base_entity import BaseEntity


class UserEntity(BaseEntity):

	"""
		Datastore entity class
	"""
	email = ndb.StringProperty()
	main_lang = ndb.StringProperty()
	solution_rating = ndb.StringProperty()
	sovled_statics = ndb.TextProperty()
	displayName = ndb.StringProperty()
	avatar = ndb.StringProperty()


