import endpoints
from problem_api import ProblemAPI
from problem_api import SolutionAPI
from user_api import UserAPI

app = endpoints.api_server([SolutionAPI, ProblemAPI, UserAPI
	])