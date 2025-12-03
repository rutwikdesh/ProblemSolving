"""Task: Find possible solutions for identified issues."""
from crewai import Task

def create_solution_finding_task(agent, analysis_report):
    """Create a task for finding solutions based on log analysis."""
    return Task(
        description=f"""
        Based on the following log analysis report, research and propose multiple 
        possible solutions for each identified issue:
        
        {analysis_report}
        
        For each issue, provide:
        1. Solution option 1: Quick fix/immediate resolution
        2. Solution option 2: Proper fix/long-term solution
        3. Solution option 3: Alternative approach (if applicable)
        
        For each solution, include:
        - Description of the solution
        - Implementation steps
        - Pros and cons
        - Risk assessment
        - Estimated time to implement
        - Required resources or permissions
        
        Prioritize solutions based on:
        - Effectiveness in resolving the root cause
        - Implementation complexity
        - Risk to production systems
        - Long-term maintainability
        """,
        agent=agent,
        expected_output="A comprehensive solutions document in markdown format with multiple solution options for each issue, including implementation details, pros/cons, and risk assessments."
    )

