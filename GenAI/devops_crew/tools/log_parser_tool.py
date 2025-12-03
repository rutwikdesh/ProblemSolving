"""Custom tools for log parsing and analysis."""
from crewai_tools import tool
import re
from typing import List, Dict
from datetime import datetime


@tool("parse_log_file")
def parse_log_file(file_path: str) -> str:
  """
  Parse a log file and extract structured information.

  Args:
      file_path: Path to the log file

  Returns:
      Formatted log content with metadata
  """
  try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
      content = f.read()

    # Extract basic statistics
    lines = content.split('\n')
    total_lines = len(lines)
    error_count = len([l for l in lines if re.search(
        r'error|ERROR|Error|exception|Exception|EXCEPTION|fatal|FATAL|Fatal', l, re.IGNORECASE)])
    warning_count = len([l for l in lines if re.search(
        r'warning|WARNING|Warning|warn|WARN', l, re.IGNORECASE)])

    metadata = f"""
        Log File Statistics:
        - Total lines: {total_lines}
        - Error lines: {error_count}
        - Warning lines: {warning_count}
        
        Log Content:
        {content}
        """

    return metadata
  except Exception as e:
    return f"Error reading log file: {str(e)}"


@tool("extract_error_patterns")
def extract_error_patterns(log_content: str) -> Dict[str, List[str]]:
  """
  Extract common error patterns from log content.

  Args:
      log_content: The log file content

  Returns:
      Dictionary of error patterns and their occurrences
  """
  patterns = {
      'connection_errors': [],
      'timeout_errors': [],
      'permission_errors': [],
      'resource_errors': [],
      'authentication_errors': [],
      'other_errors': []
  }

  lines = log_content.split('\n')

  for line in lines:
    line_lower = line.lower()
    if any(term in line_lower for term in ['connection refused', 'connection reset', 'connection timeout', 'cannot connect']):
      patterns['connection_errors'].append(line)
    elif any(term in line_lower for term in ['timeout', 'timed out', 'request timeout']):
      patterns['timeout_errors'].append(line)
    elif any(term in line_lower for term in ['permission denied', 'access denied', 'unauthorized', 'forbidden']):
      patterns['permission_errors'].append(line)
    elif any(term in line_lower for term in ['out of memory', 'disk full', 'no space', 'resource']):
      patterns['resource_errors'].append(line)
    elif any(term in line_lower for term in ['authentication failed', 'invalid credentials', 'login failed']):
      patterns['authentication_errors'].append(line)
    elif re.search(r'error|exception|fatal', line_lower):
      patterns['other_errors'].append(line)

  return patterns
