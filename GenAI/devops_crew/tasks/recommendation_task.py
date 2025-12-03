"""Task: Provide final recommended solution."""
from crewai import Task

def create_recommendation_task(agent, analysis_report, solutions_report):
    """Create a task for providing final recommendation."""
    return Task(
        description=f"""
        Based on the log analysis and proposed solutions, provide a final 
        recommended solution:
        
        Log Analysis:
        {analysis_report}
        
        Proposed Solutions:
        {solutions_report}
        
        Evaluate all solutions and provide:
        1. Final recommended solution with justification
        2. Step-by-step implementation guide
        3. Rollback plan (if applicable)
        4. Monitoring and validation steps
        5. Prevention measures for future occurrences
        6. Risk assessment and mitigation strategies
        
        Your recommendation should be:
        - Clear and actionable
        - Prioritized by urgency
        - Include all necessary commands or configuration changes
        - Consider production safety
        - Include verification steps
        """,
        agent=agent,
        expected_output="A final recommendation document in markdown format with the chosen solution, detailed implementation steps, rollback plan, monitoring steps, and prevention measures."
    )

