"""Example usage of the DevOps Log Analysis Crew."""
from crew import DevOpsLogAnalysisCrew

def example_with_file():
    """Example: Analyze a log file."""
    crew = DevOpsLogAnalysisCrew()
    
    # Analyze a log file
    result = crew.analyze_logs(log_file_path="logs/example.log")
    print(result)

def example_with_content():
    """Example: Analyze log content directly."""
    crew = DevOpsLogAnalysisCrew()
    
    # Example log content
    log_content = """
    [2024-11-29 10:00:00] ERROR: Database connection timeout
    [2024-11-29 10:00:05] WARNING: High memory usage detected: 95%
    [2024-11-29 10:00:10] ERROR: Failed to connect to Redis server
    [2024-11-29 10:00:15] ERROR: Database connection timeout
    [2024-11-29 10:00:20] CRITICAL: Service unavailable
    """
    
    result = crew.analyze_logs(log_content=log_content)
    print(result)

if __name__ == "__main__":
    print("Example 1: Analyzing log content directly")
    print("-" * 60)
    example_with_content()
    
    # Uncomment to use file-based analysis
    # print("\nExample 2: Analyzing log file")
    # print("-" * 60)
    # example_with_file()

