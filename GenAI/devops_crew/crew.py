"""Main Crew orchestration for DevOps log analysis."""
from crewai import Crew, Process
from .agents.log_analyzer_agent import create_log_analyzer_agent
from .agents.solution_finder_agent import create_solution_finder_agent
from .agents.recommendation_agent import create_recommendation_agent
from .tasks.log_analysis_task import create_log_analysis_task
from .tasks.solution_finding_task import create_solution_finding_task
from .tasks.recommendation_task import create_recommendation_task
from .tools.log_parser_tool import parse_log_file, extract_error_patterns

class DevOpsLogAnalysisCrew:
    """Crew for analyzing DevOps log files and providing solutions."""
    
    def __init__(self):
        """Initialize the crew with agents."""
        self.log_analyzer = create_log_analyzer_agent()
        self.solution_finder = create_solution_finder_agent()
        self.recommendation_agent = create_recommendation_agent()
        
        # Add tools to agents
        self.log_analyzer.tools = [parse_log_file, extract_error_patterns]
    
    def analyze_logs(self, log_file_path: str = None, log_content: str = None) -> str:
        """
        Analyze log files and provide recommendations.
        
        Args:
            log_file_path: Path to log file (optional)
            log_content: Direct log content as string (optional)
            
        Returns:
            Final recommendation report
        """
        # Get log content
        if log_file_path:
            log_content = parse_log_file(log_file_path)
        elif not log_content:
            raise ValueError("Either log_file_path or log_content must be provided")
        
        # Create tasks
        analysis_task = create_log_analysis_task(self.log_analyzer, log_content)
        solution_task = create_solution_finding_task(
            self.solution_finder, 
            "Analysis report will be provided by the log analyzer agent."
        )
        recommendation_task = create_recommendation_task(
            self.recommendation_agent,
            "Analysis report from log analyzer",
            "Solutions from solution finder"
        )
        
        # Set up task dependencies
        solution_task.context = [analysis_task]
        recommendation_task.context = [analysis_task, solution_task]
        
        # Create and run crew
        crew = Crew(
            agents=[
                self.log_analyzer,
                self.solution_finder,
                self.recommendation_agent
            ],
            tasks=[
                analysis_task,
                solution_task,
                recommendation_task
            ],
            process=Process.sequential,
            verbose=True
        )
        
        result = crew.kickoff()
        return result

