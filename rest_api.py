import endpoints
from problem_api import ProblemAPI
from problem_api import SolutionAPI

app = endpoints.api_server([SolutionAPI, ProblemAPI
	])