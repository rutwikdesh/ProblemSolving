# DevOps Log Analysis Crew

A CrewAI-based multi-agent system for analyzing DevOps log files, identifying issues, finding solutions, and providing actionable recommendations.

## Overview

This crew consists of three specialized agents working together:

1. **Log Analyzer Agent**: Analyzes log files to identify errors, warnings, patterns, and root causes
2. **Solution Finder Agent**: Researches and proposes multiple solution options for identified issues
3. **Recommendation Agent**: Evaluates solutions and provides a final, actionable recommendation

## Project Structure

```
devops_crew/
├── agents/              # Agent definitions
│   ├── log_analyzer_agent.py
│   ├── solution_finder_agent.py
│   └── recommendation_agent.py
├── tasks/               # Task definitions
│   ├── log_analysis_task.py
│   ├── solution_finding_task.py
│   └── recommendation_task.py
├── tools/               # Custom tools
│   └── log_parser_tool.py
├── config/              # Configuration files
│   └── config.yaml
├── logs/                # Input log files and output results
├── crew.py              # Main crew orchestration
├── main.py              # Entry point
└── requirements.txt     # Python dependencies
```

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your OpenAI API key:
```bash
# Create a .env file in the devops_crew directory
echo "OPENAI_API_KEY=your_api_key_here" > .env
```

Or export it as an environment variable:
```bash
export OPENAI_API_KEY=your_api_key_here
```

## Usage

### Command Line

Analyze a log file:
```bash
python main.py /path/to/logfile.log
```

Interactive mode:
```bash
python main.py
```

### Python API

```python
from devops_crew import DevOpsLogAnalysisCrew

# Initialize crew
crew = DevOpsLogAnalysisCrew()

# Analyze from file
result = crew.analyze_logs(log_file_path="path/to/logfile.log")

# Or analyze from string
log_content = """
[2024-01-01 10:00:00] ERROR: Connection timeout
[2024-01-01 10:01:00] WARNING: High memory usage
"""
result = crew.analyze_logs(log_content=log_content)

print(result)
```

## How It Works

1. **Log Analysis Task**: The Log Analyzer Agent examines the log file, identifies errors, patterns, and root causes
2. **Solution Finding Task**: The Solution Finder Agent receives the analysis and researches multiple solution options
3. **Recommendation Task**: The Recommendation Agent evaluates all solutions and provides a final recommendation with implementation steps

## Output

Results are saved in the `logs/` directory as markdown files with timestamps:
- `analysis_result_YYYYMMDD_HHMMSS.md`

Each result includes:
- Comprehensive log analysis
- Multiple solution options
- Final recommended solution
- Step-by-step implementation guide
- Risk assessment
- Prevention measures

## Customization

You can customize agents, tasks, and tools by modifying the respective files:
- Edit agent behavior in `agents/`
- Modify task descriptions in `tasks/`
- Add custom tools in `tools/`
- Adjust configuration in `config/config.yaml`

## Requirements

- Python 3.8+
- OpenAI API key
- See `requirements.txt` for full dependency list

## Example Scenarios

The crew can handle various log analysis scenarios:
- Application errors and exceptions
- Infrastructure issues (connection, timeout, resource)
- Authentication and permission problems
- Performance degradation
- System crashes and failures

Each scenario is handled by creating appropriate tasks that guide the agents through analysis, solution finding, and recommendation phases.

