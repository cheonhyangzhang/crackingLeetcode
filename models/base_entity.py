# !/usr/bin/env python

"""
	Model definition for Base Entity, all entity should inherit this base entity
"""

__author__ = 'Tianxiang Zhang'
__email__='cenhiangapply@gmail.com'

import logging
import json
from google.appengine.ext import ndb

class BaseEntity(ndb.Model):
	"""
  	Base model for various types of models
	"""
	date_created = ndb.DateTimeProperty(auto_now_add=True)
	date_updated = ndb.DateTimeProperty(auto_now=True)
	skip_properties = ['date_updated', 'date_created']

	@classmethod
	def updateByDict(cls,d):
		entity = cls.get_by_id(long(d['id']))
		entity = cls.update_entity_from_dict(entity, d)
		return entity
	@classmethod
	def createByDict(cls,d):
		entity = cls()
		entity = cls.update_entity_from_dict_nonone(entity, d)
		return entity
		
	def toDict(self):
		logging.debug("toDict")
		logging.debug(self.to_dict())
		idict = self.to_dict()
		idict['id'] = str(self.key.id())
		return idict
	@classmethod
	def generate_entity_from_dict(cls, d):

		valid_properties = {}
		for cls_property in cls._properties:
			if cls_property not in cls.skip_properties:
				logging.debug(cls_property)
				logging.debug(d[cls_property])
				property_type = cls._properties[cls_property]
				valid_properties.update({cls_property: d.get(cls_property,None)})

		if 'id' in d: # if creating a new entity
			valid_properties['id'] = d['id']
		try:
			entity = cls(**valid_properties)
		except Exception as e:
			logging.exception('Could not create entity \n' + repr(e))
			return False
		logging.debug('return entity')
		logging.debug(entity)
		return entity

	@classmethod
	def update_entity_from_dict_nonone(cls, entity, d):
		valid_properties = {}
		for cls_property in cls._properties:
			if cls_property not in cls.skip_properties:
				property_type = cls._properties[cls_property]
				if property_type._repeated == True:
					if isinstance(property_type, type(ndb.StringProperty())):
						valid_properties.update({cls_property: d.get(cls_property,[])})
				else:

					if isinstance(property_type, type(ndb.StringProperty())):
						valid_properties.update({cls_property: d.get(cls_property,"")})
					elif isinstance(property_type, type(ndb.TextProperty())):
						valid_properties.update({cls_property: d.get(cls_property,"")})
					else:
						valid_properties.update({cls_property: d.get(cls_property,None)})
		try:
			entity.populate(**valid_properties)
		except Exception as e:
			logging.exception('Could not update entity \n' + repr(e))
			return False
		entity.put()
		return entity
	@classmethod
	def update_entity_from_dict(cls, entity, d):
		valid_properties = {}
		for cls_property in cls._properties:
			if cls_property not in cls.skip_properties:
				property_type = cls._properties[cls_property]
				valid_properties.update({cls_property: d.get(cls_property,None)})
		try:
			entity.populate(**valid_properties)
		except Exception as e:
			logging.exception('Could not update entity \n' + repr(e))
			return False
		entity.put()
		return entity
		
