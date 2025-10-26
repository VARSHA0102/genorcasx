<h1 align="center">Autogen - Multi Agent AI Systems</h1>


## **Introduction to Multi-Agents**

A multi-agent system is like a team of smart helpers (AI agents) working
together to solve a problem or complete a task. And each of these agents
has a job. One might be best at finding information, while another can
make decisions and another can organize things. They communicate with
each other, and share ideas and hence they are better than a single
agent due to collaboration.

Think of a group project where one person is responsible for
researching, another writes, and someone else checks the work.
Multi-agents do much the same thing, but these \"persons\" are AI
programs which are trained to perform a particular task. Scheduling
these agents behavior becomes incredibly easy using AutoGen and then you
could have them collaborate, allowing you to make very powerful
applications for doing things like answering questions, writing code, or
managing workflow. It\'s like they say, two brains are better than one,
apparently that goes for computers too!

-   **Agents** are entities, often powered by large language models
    (LLMs), designed to perform specific tasks.

-   **Multi-agent systems** involve several such agents communicating
    and sharing tasks to solve problems more efficiently than a
    single-agent system.

## **What is Autogen?**

AutoGen is an open-source framework launched by Microsoft in September
2023 to facilitate the development of multi-agent AI systems. With
AutoGen, developers can create applications featuring AI agents, such as
GPT-4-based language models, that work with other software tools and
human guidance to address complex problems.

The framework focuses on organizing agents and offers a flexible and
reusable skeleton to support workflows between two agents to more
complex networks.

AutoGen is a flexible platform that enables dialogue and workflow
orchestration between multiple conversational agents which are often
powered by large language models (LLMs) like those from OpenAI and other
vendors. These agents are created to work together, addressing different
aspects of a problem or sometimes owning specific skills required for a
diverse range of activities - planning, coding, research and
problem-solving. AutoGen abstracts the logic involved in managing agent
interaction and freeing you to concentrate on creating, deploying, and
scaling your AI-powered solution.

It is an inherently collaborative approach to AI development based on
the 0.2 version of AutoGen, developed in partnership with Penn State
University and the University of Washington. As of August 2025, the
platform-based on AutoGen already covers such domains as code generation
and data transformations and leverages an active base of open-source
contributors.

## **Autogen Architecture Diagram**  

![](./autogenBlog_1.png)


*Image source link***: [[click
here]](https://microsoft.github.io/autogen/0.2/assets/images/autogen_agentchat-250ca64b77b87e70d34766a080bf6ba8.png)**

## **Default Agents and Workflow Operations**

AutoGen is collaboratively built and the default two-agent setup,
AssistantAgent and UserProxyAgent, demonstrates this feature.

**AssistantAgent**

-   **Role**: An LLM-driven agent for reasoning, planning, and solution
    generation, such as code or text.

-   **Configuration**: This agent can be configured using an llm_config
    and airing setting such as the system message 'End with
    \"TERMINATE\"'.

-   **Behavior**: Analyzes tasks and provides solutions but does not
    execute code.

**UserProxyAgent**

-   **Role**: This agent serves as the user\'s representative. This
    agent initiates tasks, manages human input, and performs it tools or
    codes execution.

-   **Configuration**: This agent may be configured using
    code_execution_config (eg. Docker executor) and human_input_mode (
    \"NEVER\" for NO autonomy and \'ALWAYS\' for manual input). Maxing
    of the limit of max_consecutive_auto_reply restricts this agent from
    performing excessive operations.

-   **Behavior**: Sends tasks, executes code from AssistantAgent, and
    relays results.

**Workflow Operations**

1.  **Initialization**: Agents are initialized with LLM and execution
    settings.

2.  **Task Initiation**: UserProxyAgent issues the first task prompt
    (e.g., \"Plot stock prices\").

3.  **Conversation Loop**:

    -   AssistantAgent provides a response as a solution to the
        UserProxyAgent's prompts.

    -   UserProxyAgent executes the obtained solution to produce
        outputs.

    -   If the solution is not successful, the agents return to this
        step.

4.  **Termination**: The iteration process can be terminated from the
    AssistantAgent\'s side by sending \"TERMINATE\" or having reached
    the total reply limit.

5.  **Output**: The obtained result and conversation logs are retained.

This process allows for rapid prototyping and possibilities for running
multiple agents for more advanced operations.

## **Installation and Setup of Autogen**

**Prerequisites**

-   **Python**: Version 3.8 to \<3.13. Verify with python \--version.
    Install if it is not available at python.org.

-   **Operating System**: Windows, macOS, and Linux are compatible.

-   **LLM API Key**: Once you have an OpenAI account, get an API key
    from platform.openai.com.

-   **Docker (Optional)**: For secure code execution, install Docker
    from docs.docker.com/get-docker/.

**Installation Steps**

1.  **Create a Virtual Environment**:

    -   Set up a project directory: mkdir autogen-project && cd
        autogen-project.

    -   Create and activate a virtual environment:

```bash
# Create a virtual environment
python3 -m venv .venv

# Activate it (Unix/macOS)
source .venv/bin/activate

# Or activate it (Windows)
.venv\Scripts\activate
```

-   Deactivate later with deactivate.

**Install AutoGen**:

```bash
pip install autogen-agentchat~=0.2
```

**Configure LLM Access**:

-   Set your OpenAI API key:

    -   Unix/macOS: export OPENAI_API_KEY=your_api_key_here

    -   Windows: set OPENAI_API_KEY=your_api_key_here

-   Replace your_api_key_here with your actual key.

**Set Up Docker (Optional)**:

-   Install Docker per OS-specific instructions at docs.docker.com.

-   Start Docker Desktop or daemon (Linux).

-   Verify: docker \--version.

## Basic Example

This example creates a two-agent system where one agent generates a
Python script to plot stock prices, and the other executes it. Save as
autogen_stock_plot.py:

**Local Execution**
```python
import os
import autogen
from autogen import AssistantAgent, UserProxyAgent

llm_config = {"model": "gpt-4", "api_key": os.environ["OPENAI_API_KEY"]}
assistant = AssistantAgent("assistant", llm_config=llm_config)

user_proxy = UserProxyAgent(
  "user_proxy",
  code_execution_config={
    "executor": autogen.coding.LocalCommandLineCodeExecutor(work_dir="coding")
  }
)

# Start the chat
user_proxy.initiate_chat(
  assistant,
  message="Plot a chart of NVDA and TESLA stock price change YTD.",
)
```
**Docker Execution**

```python
import os
from pathlib import Path
from autogen import AssistantAgent, UserProxyAgent
from autogen.coding import DockerCommandLineCodeExecutor

# Configure LLM with OpenAI API key
llm_config = {
  "config_list": [{
    "model": "gpt-4",
    "api_key": os.environ.get("OPENAI_API_KEY")
  }]
}

# Set up Docker for code execution
work_dir = Path("coding")
work_dir.mkdir(exist_ok=True)
code_executor = DockerCommandLineCodeExecutor(work_dir=work_dir)

# Initialize AssistantAgent for reasoning and code generation
assistant = AssistantAgent(
  name="Assistant",
  llm_config=llm_config,
  system_message="You are an AI assistant. Provide solutions and end with TERMINATE."
)

# Initialize UserProxyAgent for task initiation and execution
user_proxy = UserProxyAgent(
  name="UserProxy",
  code_execution_config={"executor": code_executor},
  human_input_mode="NEVER",  # Fully autonomous
  max_consecutive_auto_reply=10  # Prevent infinite loops
)

# Start chat with a task
user_proxy.initiate_chat(
  assistant,
  message="Generate a chart of AAPL and MSFT stock prices for the last year, saving it as stock_chart.png."
)
```

**Run the Example**:

-   Execute: *python autogen_stock_plot.py.*

-   The agents interact: UserProxy sends the task, Assistant generates
    code (e.g., using matplotlib), UserProxy executes it in Docker, and
    results (e.g., stock_chart.png) are saved in the coding directory.

-   Chat ends when Assistant responds with "TERMINATE" or at the 10th
    auto-reply.

**Notes**:

-   Ensure Docker is running for code execution. For non-code tasks, set
    code_execution_config=False.

-   Verify the API key: echo \$OPENAI_API_KEY (Unix) or echo
    %OPENAI_API_KEY% (Windows).

-   Install dependencies like matplotlib in the Docker environment if
    required.


## **Features of AutoGen**

AutoGen comes packed with advanced features that make it a powerful framework for building multi-agent systems:

- **Conversable Agents** — Custom agents that combine LLMs with tools and human interactions.  
- **Flexible Workflows** — Supports autonomous, human-in-the-loop, dynamic, group, or hierarchical chats.  
- **Tool Integration** — Enables code execution, function calling, and seamless API connectivity.  
- **Modular Design** — Provides pluggable components for agents, memory, and custom handlers.  
- **Versatility** — Suitable for diverse domains like coding, data analysis, research, and creative tasks.  
- **Scalability** — Supports distributed agents and asynchronous communication for large-scale systems.


## **Use Cases of AutoGen**

AutoGen’s multi-agent nature allows it to be applied across a wide range of domains to solve diverse problems. Its versatility enables collaboration between specialized agents to perform complex, multi-step tasks efficiently. Some key use cases include:

- **Software Development and Debugging**  
  Agents can handle code generation, testing, and optimization — for instance, one agent creates a Python script, another runs tests, and a third suggests performance improvements. This collaboration significantly reduces the development cycle.

- **Data Analysis and Visualization**  
  Agents can query financial data, perform statistical analysis, and generate trend visualizations, enabling dynamic data insights and faster decision-making.

- **Research Automation**  
  Specialized agents can analyze literature, run simulations, and evaluate experiment results, allowing human researchers to focus on validation and interpretation.

- **Educational Tools**  
  Agents can simulate teacher–student interactions — explaining concepts, asking questions, and providing feedback — creating interactive, AI-powered learning experiences.

## **Why AutoGen Over Other Multi-Agent Systems**

- **Conversational Flexibility**  
  While tools like CrewAI are powerful for structured tasks and LangGraph is versatile for connectionist, multi-relational flow-based representations, AutoGen best combines both approaches — offering superior conversational flexibility.

- **Human-in-the-Loop Integration**  
  AutoGen provides the most integrated human-in-the-loop design with two configurable parameters, whereas other frameworks restrict human input to narrow branches controlled by "always" or "never" indicators.

## Comparison of Autogen with CrewAI

| **Aspects** | **Autogen** | **CrewAI** |
|--------------|----------|---------|
| **Approach** | Conversational and interactive: Agents communicate via natural language in chats. | Declarative and orchestrative: Define structures (agents, tasks) upfront; framework automates execution. |
| **Key Components** | AssistantAgent: The core conversational piece.<br>GroupChat: Multi-agent conversation threads.<br>GroupChatManager: Manages flow, like a meeting manager. | Agents: Tools & goals-based.<br>Tasks: Small units of work.<br>Crews: Teams of agents.<br>Flows: Workflow orchestration with logic. |
| **Workflow Style** | Conversational: Agents form “chat teams” for exploratory or hierarchical reasoning. | Structured processes: Fixed-order flows; event-driven control for complex logic. |
| **Human Involvement** | High-end support for human proxies within dialogues. | Mostly through reviews or semi-autonomous flows. |
| **Use Cases** | Ideal for research, coding, or creative exploration where conversation drives outcomes. | Suited for rule-based workflows like approvals or content pipelines. |


Thus, AutoGen best covers the intended multi-agent usage scenario, as
it has a balance of convenience, flexible access to input
representations, and processing distance to pupil methodology.
## **Advantages of AutoGen**

AutoGen offers several benefits that make it a powerful multi-agent system:

- **Versatility** — Suitable for a wide range of tasks and agent configurations.  
- **Simplified Orchestration** — Reduces complexity when managing LLM workflows.  
- **Human Integration** — Allows human input to be integrated into automated processes.  
- **Enhanced Collaboration** — Multiple agents collaborate efficiently, improving accuracy (though at higher computational costs).  

## **Disadvantages of AutoGen**

Despite its strengths, AutoGen has some limitations:

- **Learning Curve** — Conceptually complex LLM configurations can challenge beginners.  
- **Setup Overhead** — Full functionality requires API keys, Docker setup, and configuration.  
- **Performance Costs** — More agents mean higher communication overhead and resource usage.  
- **Limited Structure** — Compared to other systems like CrewAI, AutoGen provides less rigid workflow structure for strictly logical step-by-step execution.


## **Conclusion**

AutoGen emerges as a revolutionary framework providing developers with
the opportunity to leverage multi-agent AI to solve issues
collaboratively. Relying on its user-friendly two-agent approach, broad
functionality, and applicability to an array of areas, from software
engineering to creative endeavors, the platform becomes a versatile tool
that aligns with the specifics of AI used today. Offering unprecedented
conversational freedom, expanded tool compatibility, and a robust user
community, AutoGen outperforms several other multi-agent systems.
Despite the difficulties associated with the necessity for tool
compatibility and certain performance restrictions, the platform's
benefits support progress in domains in which dynamic and scalable
solutions are imperative. Adopt AutoGen and use its unique potential to
promote collaborative AI approaches and influence the development of
intelligent automation.
