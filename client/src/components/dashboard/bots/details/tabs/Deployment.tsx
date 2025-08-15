import CodeSyntax from "@/components/shared/CodeSyntax";

const Deployment: React.FC<{ data: { widgetId: string } }> = ({
  data: { widgetId },
}) => {
  const DeploymentOptions = [
    {
      id: 1,
      title: "Access via Direct Link",
      description:
        "Share a unique URL to let users interact with your chatbot instantly—no extra setup required.",
      content: `http://localhost:3000/embed/${widgetId}`,
    },
    {
      id: 2,
      title: "Embed in Your Website",
      description:
        "Seamlessly integrate the chatbot into your webpage using an iframe for a fully embedded experience.",
      content: `<iframe style={{ width: 400, height: 600 }} src="http://localhost:3000/embed/${widgetId}"></iframe>`,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Deployment</h1>
        <p className="text-sm text-[var(--primary-gray)]">
          Deploy and integrate your chatbot across websites, applications, and
          messaging platforms.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {DeploymentOptions.map((option) => (
          <div key={option.id} className="flex items-center gap-5">
            <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-gray-100 p-5 text-5xl text-gray-500">
              {option.id}
            </div>
            <div className="space-y-5">
              <div className="space-y-1">
                <h2 className="font-semibold">{option.title}</h2>
                <p className="text-sm text-[var(--primary-gray)]">
                  {option.description}
                </p>
              </div>
              <CodeSyntax codeSnippet={option.content} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deployment;
