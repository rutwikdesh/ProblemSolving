"""Solution Finder Agent - Finds possible solutions for identified issues."""
from crewai import Agent
from langchain_openai import ChatOpenAI

def create_solution_finder_agent():
    """Create a solution finder agent that researches and proposes solutions."""
    return Agent(
        role='DevOps Solutions Architect',
        goal='Research and identify multiple possible solutions for the issues found in logs, considering best practices and industry standards',
        backstory="""You are a DevOps Solutions Architect with extensive knowledge of 
        troubleshooting methodologies, system administration, cloud platforms, and 
        infrastructure best practices. You have solved thousands of production issues 
        and know how to find solutions from documentation, knowledge bases, and 
        community resources. You always consider multiple approaches before recommending 
        a solution.""",
        verbose=True,
        allow_delegation=False,
        llm=ChatOpenAI(model="gpt-4", temperature=0.2)
    )

