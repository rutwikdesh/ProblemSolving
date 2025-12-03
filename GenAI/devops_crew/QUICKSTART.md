# Quick Start Guide

Get started with the DevOps Log Analysis Crew in minutes!

## Prerequisites

1. Python 3.8 or higher
2. OpenAI API key

## Installation

```bash
# Navigate to the devops_crew directory
cd GenAI/devops_crew

# Install dependencies
pip install -r requirements.txt

# Set up your OpenAI API key
# Option 1: Create a .env file
echo "OPENAI_API_KEY=your_api_key_here" > .env

# Option 2: Export as environment variable (Windows PowerShell)
$env:OPENAI_API_KEY="your_api_key_here"

# Option 2: Export as environment variable (Linux/Mac)
export OPENAI_API_KEY=your_api_key_here
```

## Quick Examples

### Example 1: Analyze Log Content Directly

```python
from crew import DevOpsLogAnalysisCrew

crew = DevOpsLogAnalysisCrew()

log_content = """
[2024-11-29 10:00:00] ERROR: Database connection timeout
[2024-11-29 10:00:05] WARNING: High memory usage: 95%
[2024-11-29 10:00:10] ERROR: Failed to connect to Redis
"""

result = crew.analyze_logs(log_content=log_content)
print(result)
```

### Example 2: Analyze Log File

```python
from crew import DevOpsLogAnalysisCrew

crew = DevOpsLogAnalysisCrew()
result = crew.analyze_logs(log_file_path="path/to/your/logfile.log")
print(result)
```

### Example 3: Command Line Usage

```bash
# Analyze a log file
python main.py path/to/logfile.log

# Interactive mode
python main.py
```

## What Happens

1. **Log Analyzer Agent** analyzes your log file and identifies:
   - Errors and their severity
   - Warning messages
   - Error patterns
   - Root causes
   - Timeline of events

2. **Solution Finder Agent** researches and proposes:
   - Multiple solution options
   - Implementation steps
   - Pros and cons
   - Risk assessments

3. **Recommendation Agent** provides:
   - Final recommended solution
   - Step-by-step implementation guide
   - Rollback plan
   - Monitoring steps
   - Prevention measures

## Output

Results are automatically saved to `logs/analysis_result_YYYYMMDD_HHMMSS.md`

The output includes:
- Complete analysis report
- Multiple solution options
- Final recommendation
- Implementation steps
- Risk assessment

## Next Steps

- Read `README.md` for detailed documentation
- Check `SCENARIOS.md` for different use cases
- Customize agents and tasks for your specific needs
- Add custom tools in the `tools/` directory

## Troubleshooting

**Issue**: `ModuleNotFoundError`
- **Solution**: Make sure you're in the `devops_crew` directory or have installed the package

**Issue**: `OpenAI API key not found`
- **Solution**: Set your API key in `.env` file or as environment variable

**Issue**: Import errors
- **Solution**: Run from the `devops_crew` directory or adjust Python path

