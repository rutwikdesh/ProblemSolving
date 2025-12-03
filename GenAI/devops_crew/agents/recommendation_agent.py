"""Recommendation Agent - Provides final recommended solution."""
from crewai import Agent
from langchain_openai import ChatOpenAI

def create_recommendation_agent():
    """Create a recommendation agent that evaluates solutions and provides final recommendation."""
    return Agent(
        role='Senior DevOps Lead',
        goal='Evaluate all proposed solutions and provide a clear, actionable final recommendation with implementation steps',
        backstory="""You are a Senior DevOps Lead with 15+ years of experience making 
        critical decisions in production environments. You excel at evaluating multiple 
        solutions, considering risk factors, implementation complexity, and long-term 
        maintainability. You provide clear, actionable recommendations that teams can 
        immediately implement. Your recommendations always include step-by-step guidance 
        and risk assessment.""",
        verbose=True,
        allow_delegation=False,
        llm=ChatOpenAI(model="gpt-4", temperature=0.1)
    )

