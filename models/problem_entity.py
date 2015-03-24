# !/usr/bin/env python

"""
	Model definition for Problem entity
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


class SolutionEntity(BaseEntity):

	"""
		Datastore entity class
	"""
	no = ndb.StringProperty()
	solution = ndb.TextProperty()
	analysis = ndb.TextProperty()
	tags = ndb.StringProperty(repeated = True)
	difficulty = ndb.StringProperty()
	onmyself = ndb.StringProperty()
	time = ndb.StringProperty()
	owner = ndb.StringProperty()
	title = ndb.StringProperty()
	atype = ndb.StringProperty()

class ProblemEntity(BaseEntity):

	"""
		Datastore entity class
	"""
	no = ndb.StringProperty()
	atype = ndb.StringProperty()
	title = ndb.StringProperty()
	url = ndb.StringProperty()
	description = ndb.TextProperty()
	tags = ndb.StringProperty(repeated = True)
	difficulty = ndb.StringProperty()


	



