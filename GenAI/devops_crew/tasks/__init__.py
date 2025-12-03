"""Task definitions for DevOps log analysis crew."""

from .log_analysis_task import create_log_analysis_task
from .solution_finding_task import create_solution_finding_task
from .recommendation_task import create_recommendation_task

__all__ = [
    'create_log_analysis_task',
    'create_solution_finding_task',
    'create_recommendation_task'
]

