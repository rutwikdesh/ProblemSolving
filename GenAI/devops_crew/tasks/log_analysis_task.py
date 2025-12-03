"""Task: Analyze log files and identify issues."""
from crewai import Task

def create_log_analysis_task(agent, log_content):
    """Create a task for analyzing log files."""
    return Task(
        description=f"""
        Analyze the following log file content and identify:
        1. All errors and their severity levels
        2. Warning messages and potential issues
        3. Error patterns and recurring issues
        4. Root causes of the problems
        5. Timeline of events leading to errors
        6. Affected components or services
        
        Log Content:
        {log_content}
        
        Provide a comprehensive analysis report with:
        - Summary of issues found
        - Categorized list of errors
        - Pattern analysis
        - Root cause identification
        - Impact assessment
        """,
        agent=agent,
        expected_output="A detailed analysis report in markdown format containing: summary, categorized errors, patterns, root causes, and impact assessment."
    )

