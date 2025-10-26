const e=`<h1 align="center">Autogen - Multi Agent AI Systems</h1>\r
\r
\r
## **Introduction to Multi-Agents**\r
\r
A multi-agent system is like a team of smart helpers (AI agents) working\r
together to solve a problem or complete a task. And each of these agents\r
has a job. One might be best at finding information, while another can\r
make decisions and another can organize things. They communicate with\r
each other, and share ideas and hence they are better than a single\r
agent due to collaboration.\r
\r
Think of a group project where one person is responsible for\r
researching, another writes, and someone else checks the work.\r
Multi-agents do much the same thing, but these \\"persons\\" are AI\r
programs which are trained to perform a particular task. Scheduling\r
these agents behavior becomes incredibly easy using AutoGen and then you\r
could have them collaborate, allowing you to make very powerful\r
applications for doing things like answering questions, writing code, or\r
managing workflow. It\\'s like they say, two brains are better than one,\r
apparently that goes for computers too!\r
\r
-   **Agents** are entities, often powered by large language models\r
    (LLMs), designed to perform specific tasks.\r
\r
-   **Multi-agent systems** involve several such agents communicating\r
    and sharing tasks to solve problems more efficiently than a\r
    single-agent system.\r
\r
## **What is Autogen?**\r
\r
AutoGen is an open-source framework launched by Microsoft in September\r
2023 to facilitate the development of multi-agent AI systems. With\r
AutoGen, developers can create applications featuring AI agents, such as\r
GPT-4-based language models, that work with other software tools and\r
human guidance to address complex problems.\r
\r
The framework focuses on organizing agents and offers a flexible and\r
reusable skeleton to support workflows between two agents to more\r
complex networks.\r
\r
AutoGen is a flexible platform that enables dialogue and workflow\r
orchestration between multiple conversational agents which are often\r
powered by large language models (LLMs) like those from OpenAI and other\r
vendors. These agents are created to work together, addressing different\r
aspects of a problem or sometimes owning specific skills required for a\r
diverse range of activities - planning, coding, research and\r
problem-solving. AutoGen abstracts the logic involved in managing agent\r
interaction and freeing you to concentrate on creating, deploying, and\r
scaling your AI-powered solution.\r
\r
It is an inherently collaborative approach to AI development based on\r
the 0.2 version of AutoGen, developed in partnership with Penn State\r
University and the University of Washington. As of August 2025, the\r
platform-based on AutoGen already covers such domains as code generation\r
and data transformations and leverages an active base of open-source\r
contributors.\r
\r
## **Autogen Architecture Diagram**  \r
\r
![](./autogenBlog_1.png)\r
\r
\r
*Image source link***: [[click\r
here]](https://microsoft.github.io/autogen/0.2/assets/images/autogen_agentchat-250ca64b77b87e70d34766a080bf6ba8.png)**\r
\r
## **Default Agents and Workflow Operations**\r
\r
AutoGen is collaboratively built and the default two-agent setup,\r
AssistantAgent and UserProxyAgent, demonstrates this feature.\r
\r
**AssistantAgent**\r
\r
-   **Role**: An LLM-driven agent for reasoning, planning, and solution\r
    generation, such as code or text.\r
\r
-   **Configuration**: This agent can be configured using an llm_config\r
    and airing setting such as the system message 'End with\r
    \\"TERMINATE\\"'.\r
\r
-   **Behavior**: Analyzes tasks and provides solutions but does not\r
    execute code.\r
\r
**UserProxyAgent**\r
\r
-   **Role**: This agent serves as the user\\'s representative. This\r
    agent initiates tasks, manages human input, and performs it tools or\r
    codes execution.\r
\r
-   **Configuration**: This agent may be configured using\r
    code_execution_config (eg. Docker executor) and human_input_mode (\r
    \\"NEVER\\" for NO autonomy and \\'ALWAYS\\' for manual input). Maxing\r
    of the limit of max_consecutive_auto_reply restricts this agent from\r
    performing excessive operations.\r
\r
-   **Behavior**: Sends tasks, executes code from AssistantAgent, and\r
    relays results.\r
\r
**Workflow Operations**\r
\r
1.  **Initialization**: Agents are initialized with LLM and execution\r
    settings.\r
\r
2.  **Task Initiation**: UserProxyAgent issues the first task prompt\r
    (e.g., \\"Plot stock prices\\").\r
\r
3.  **Conversation Loop**:\r
\r
    -   AssistantAgent provides a response as a solution to the\r
        UserProxyAgent's prompts.\r
\r
    -   UserProxyAgent executes the obtained solution to produce\r
        outputs.\r
\r
    -   If the solution is not successful, the agents return to this\r
        step.\r
\r
4.  **Termination**: The iteration process can be terminated from the\r
    AssistantAgent\\'s side by sending \\"TERMINATE\\" or having reached\r
    the total reply limit.\r
\r
5.  **Output**: The obtained result and conversation logs are retained.\r
\r
This process allows for rapid prototyping and possibilities for running\r
multiple agents for more advanced operations.\r
\r
## **Installation and Setup of Autogen**\r
\r
**Prerequisites**\r
\r
-   **Python**: Version 3.8 to \\<3.13. Verify with python \\--version.\r
    Install if it is not available at python.org.\r
\r
-   **Operating System**: Windows, macOS, and Linux are compatible.\r
\r
-   **LLM API Key**: Once you have an OpenAI account, get an API key\r
    from platform.openai.com.\r
\r
-   **Docker (Optional)**: For secure code execution, install Docker\r
    from docs.docker.com/get-docker/.\r
\r
**Installation Steps**\r
\r
1.  **Create a Virtual Environment**:\r
\r
    -   Set up a project directory: mkdir autogen-project && cd\r
        autogen-project.\r
\r
    -   Create and activate a virtual environment:\r
\r
\`\`\`bash\r
# Create a virtual environment\r
python3 -m venv .venv\r
\r
# Activate it (Unix/macOS)\r
source .venv/bin/activate\r
\r
# Or activate it (Windows)\r
.venv\\Scripts\\activate\r
\`\`\`\r
\r
-   Deactivate later with deactivate.\r
\r
**Install AutoGen**:\r
\r
\`\`\`bash\r
pip install autogen-agentchat~=0.2\r
\`\`\`\r
\r
**Configure LLM Access**:\r
\r
-   Set your OpenAI API key:\r
\r
    -   Unix/macOS: export OPENAI_API_KEY=your_api_key_here\r
\r
    -   Windows: set OPENAI_API_KEY=your_api_key_here\r
\r
-   Replace your_api_key_here with your actual key.\r
\r
**Set Up Docker (Optional)**:\r
\r
-   Install Docker per OS-specific instructions at docs.docker.com.\r
\r
-   Start Docker Desktop or daemon (Linux).\r
\r
-   Verify: docker \\--version.\r
\r
## Basic Example\r
\r
This example creates a two-agent system where one agent generates a\r
Python script to plot stock prices, and the other executes it. Save as\r
autogen_stock_plot.py:\r
\r
**Local Execution**\r
\`\`\`python\r
import os\r
import autogen\r
from autogen import AssistantAgent, UserProxyAgent\r
\r
llm_config = {"model": "gpt-4", "api_key": os.environ["OPENAI_API_KEY"]}\r
assistant = AssistantAgent("assistant", llm_config=llm_config)\r
\r
user_proxy = UserProxyAgent(\r
  "user_proxy",\r
  code_execution_config={\r
    "executor": autogen.coding.LocalCommandLineCodeExecutor(work_dir="coding")\r
  }\r
)\r
\r
# Start the chat\r
user_proxy.initiate_chat(\r
  assistant,\r
  message="Plot a chart of NVDA and TESLA stock price change YTD.",\r
)\r
\`\`\`\r
**Docker Execution**\r
\r
\`\`\`python\r
import os\r
from pathlib import Path\r
from autogen import AssistantAgent, UserProxyAgent\r
from autogen.coding import DockerCommandLineCodeExecutor\r
\r
# Configure LLM with OpenAI API key\r
llm_config = {\r
  "config_list": [{\r
    "model": "gpt-4",\r
    "api_key": os.environ.get("OPENAI_API_KEY")\r
  }]\r
}\r
\r
# Set up Docker for code execution\r
work_dir = Path("coding")\r
work_dir.mkdir(exist_ok=True)\r
code_executor = DockerCommandLineCodeExecutor(work_dir=work_dir)\r
\r
# Initialize AssistantAgent for reasoning and code generation\r
assistant = AssistantAgent(\r
  name="Assistant",\r
  llm_config=llm_config,\r
  system_message="You are an AI assistant. Provide solutions and end with TERMINATE."\r
)\r
\r
# Initialize UserProxyAgent for task initiation and execution\r
user_proxy = UserProxyAgent(\r
  name="UserProxy",\r
  code_execution_config={"executor": code_executor},\r
  human_input_mode="NEVER",  # Fully autonomous\r
  max_consecutive_auto_reply=10  # Prevent infinite loops\r
)\r
\r
# Start chat with a task\r
user_proxy.initiate_chat(\r
  assistant,\r
  message="Generate a chart of AAPL and MSFT stock prices for the last year, saving it as stock_chart.png."\r
)\r
\`\`\`\r
\r
**Run the Example**:\r
\r
-   Execute: *python autogen_stock_plot.py.*\r
\r
-   The agents interact: UserProxy sends the task, Assistant generates\r
    code (e.g., using matplotlib), UserProxy executes it in Docker, and\r
    results (e.g., stock_chart.png) are saved in the coding directory.\r
\r
-   Chat ends when Assistant responds with "TERMINATE" or at the 10th\r
    auto-reply.\r
\r
**Notes**:\r
\r
-   Ensure Docker is running for code execution. For non-code tasks, set\r
    code_execution_config=False.\r
\r
-   Verify the API key: echo \\$OPENAI_API_KEY (Unix) or echo\r
    %OPENAI_API_KEY% (Windows).\r
\r
-   Install dependencies like matplotlib in the Docker environment if\r
    required.\r
\r
\r
## **Features of AutoGen**\r
\r
AutoGen comes packed with advanced features that make it a powerful framework for building multi-agent systems:\r
\r
- **Conversable Agents** — Custom agents that combine LLMs with tools and human interactions.  \r
- **Flexible Workflows** — Supports autonomous, human-in-the-loop, dynamic, group, or hierarchical chats.  \r
- **Tool Integration** — Enables code execution, function calling, and seamless API connectivity.  \r
- **Modular Design** — Provides pluggable components for agents, memory, and custom handlers.  \r
- **Versatility** — Suitable for diverse domains like coding, data analysis, research, and creative tasks.  \r
- **Scalability** — Supports distributed agents and asynchronous communication for large-scale systems.\r
\r
\r
## **Use Cases of AutoGen**\r
\r
AutoGen’s multi-agent nature allows it to be applied across a wide range of domains to solve diverse problems. Its versatility enables collaboration between specialized agents to perform complex, multi-step tasks efficiently. Some key use cases include:\r
\r
- **Software Development and Debugging**  \r
  Agents can handle code generation, testing, and optimization — for instance, one agent creates a Python script, another runs tests, and a third suggests performance improvements. This collaboration significantly reduces the development cycle.\r
\r
- **Data Analysis and Visualization**  \r
  Agents can query financial data, perform statistical analysis, and generate trend visualizations, enabling dynamic data insights and faster decision-making.\r
\r
- **Research Automation**  \r
  Specialized agents can analyze literature, run simulations, and evaluate experiment results, allowing human researchers to focus on validation and interpretation.\r
\r
- **Educational Tools**  \r
  Agents can simulate teacher–student interactions — explaining concepts, asking questions, and providing feedback — creating interactive, AI-powered learning experiences.\r
\r
## **Why AutoGen Over Other Multi-Agent Systems**\r
\r
- **Conversational Flexibility**  \r
  While tools like CrewAI are powerful for structured tasks and LangGraph is versatile for connectionist, multi-relational flow-based representations, AutoGen best combines both approaches — offering superior conversational flexibility.\r
\r
- **Human-in-the-Loop Integration**  \r
  AutoGen provides the most integrated human-in-the-loop design with two configurable parameters, whereas other frameworks restrict human input to narrow branches controlled by "always" or "never" indicators.\r
\r
## Comparison of Autogen with CrewAI\r
\r
| **Aspects** | **Autogen** | **CrewAI** |\r
|--------------|----------|---------|\r
| **Approach** | Conversational and interactive: Agents communicate via natural language in chats. | Declarative and orchestrative: Define structures (agents, tasks) upfront; framework automates execution. |\r
| **Key Components** | AssistantAgent: The core conversational piece.<br>GroupChat: Multi-agent conversation threads.<br>GroupChatManager: Manages flow, like a meeting manager. | Agents: Tools & goals-based.<br>Tasks: Small units of work.<br>Crews: Teams of agents.<br>Flows: Workflow orchestration with logic. |\r
| **Workflow Style** | Conversational: Agents form “chat teams” for exploratory or hierarchical reasoning. | Structured processes: Fixed-order flows; event-driven control for complex logic. |\r
| **Human Involvement** | High-end support for human proxies within dialogues. | Mostly through reviews or semi-autonomous flows. |\r
| **Use Cases** | Ideal for research, coding, or creative exploration where conversation drives outcomes. | Suited for rule-based workflows like approvals or content pipelines. |\r
\r
\r
Thus, AutoGen best covers the intended multi-agent usage scenario, as\r
it has a balance of convenience, flexible access to input\r
representations, and processing distance to pupil methodology.\r
## **Advantages of AutoGen**\r
\r
AutoGen offers several benefits that make it a powerful multi-agent system:\r
\r
- **Versatility** — Suitable for a wide range of tasks and agent configurations.  \r
- **Simplified Orchestration** — Reduces complexity when managing LLM workflows.  \r
- **Human Integration** — Allows human input to be integrated into automated processes.  \r
- **Enhanced Collaboration** — Multiple agents collaborate efficiently, improving accuracy (though at higher computational costs).  \r
\r
## **Disadvantages of AutoGen**\r
\r
Despite its strengths, AutoGen has some limitations:\r
\r
- **Learning Curve** — Conceptually complex LLM configurations can challenge beginners.  \r
- **Setup Overhead** — Full functionality requires API keys, Docker setup, and configuration.  \r
- **Performance Costs** — More agents mean higher communication overhead and resource usage.  \r
- **Limited Structure** — Compared to other systems like CrewAI, AutoGen provides less rigid workflow structure for strictly logical step-by-step execution.\r
\r
\r
## **Conclusion**\r
\r
AutoGen emerges as a revolutionary framework providing developers with\r
the opportunity to leverage multi-agent AI to solve issues\r
collaboratively. Relying on its user-friendly two-agent approach, broad\r
functionality, and applicability to an array of areas, from software\r
engineering to creative endeavors, the platform becomes a versatile tool\r
that aligns with the specifics of AI used today. Offering unprecedented\r
conversational freedom, expanded tool compatibility, and a robust user\r
community, AutoGen outperforms several other multi-agent systems.\r
Despite the difficulties associated with the necessity for tool\r
compatibility and certain performance restrictions, the platform's\r
benefits support progress in domains in which dynamic and scalable\r
solutions are imperative. Adopt AutoGen and use its unique potential to\r
promote collaborative AI approaches and influence the development of\r
intelligent automation.\r
`;export{e as default};
