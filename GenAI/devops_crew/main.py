"""Main entry point for DevOps log analysis crew."""
import os
import sys
from pathlib import Path

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from crew import DevOpsLogAnalysisCrew

def main():
    """Main function to run the DevOps log analysis crew."""
    print("=" * 60)
    print("DevOps Log Analysis Crew")
    print("=" * 60)
    print()
    
    # Initialize crew
    crew = DevOpsLogAnalysisCrew()
    
    # Get log file path or content
    if len(sys.argv) > 1:
        log_file_path = sys.argv[1]
        if not os.path.exists(log_file_path):
            print(f"Error: Log file not found: {log_file_path}")
            sys.exit(1)
        print(f"Analyzing log file: {log_file_path}")
        result = crew.analyze_logs(log_file_path=log_file_path)
    else:
        # Interactive mode - ask for log file or content
        print("Enter log file path or paste log content (press Ctrl+D or Ctrl+Z when done):")
        print("1. Enter file path")
        print("2. Paste log content directly")
        choice = input("Choice (1 or 2): ").strip()
        
        if choice == "1":
            log_file_path = input("Enter log file path: ").strip()
            if not os.path.exists(log_file_path):
                print(f"Error: Log file not found: {log_file_path}")
                sys.exit(1)
            result = crew.analyze_logs(log_file_path=log_file_path)
        elif choice == "2":
            print("Paste log content (press Ctrl+D or Ctrl+Z when done):")
            log_content = ""
            try:
                while True:
                    line = input()
                    log_content += line + "\n"
            except EOFError:
                pass
            result = crew.analyze_logs(log_content=log_content)
        else:
            print("Invalid choice")
            sys.exit(1)
    
    # Save result
    output_dir = Path(__file__).parent / "logs"
    output_dir.mkdir(exist_ok=True)
    
    from datetime import datetime
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = output_dir / f"analysis_result_{timestamp}.md"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(str(result))
    
    print()
    print("=" * 60)
    print("Analysis Complete!")
    print(f"Results saved to: {output_file}")
    print("=" * 60)
    print()
    print(result)

if __name__ == "__main__":
    main()

