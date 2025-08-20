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
      content: `https://converss.vercel.app/embed/${widgetId}`,
    },
    {
      id: 2,
      title: "Embed in Your Website",
      description:
        "Seamlessly integrate the chatbot into your webpage using an iframe for a fully embedded experience.",
      content: `<iframe style={{ width: 400, height: 600 }} src="https://converss.vercel.app/embed/${widgetId}"></iframe>`,
    },
    {
      id: 3,
      title: "Embed via Script (Floating Chat Widget)",
      description:
        "Add a single script tag to your site to display a floating chatbot widget on every page.",
      content: `<script src="https://converss.vercel.app/embed.js" data-widget-id="${widgetId}"></script>`,
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
          <div
            key={option.id}
            className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-5"
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 p-5 text-4xl text-gray-500 sm:h-40 sm:w-40 sm:text-5xl lg:h-48 lg:w-48">
              {option.id}
            </div>
            <div className="w-full space-y-5 xl:w-auto">
              <div className="space-y-1">
                <h2 className="font-semibold">{option.title}</h2>
                <p className="text-sm text-[var(--primary-gray)]">
                  {option.description}
                </p>
              </div>
              <div className="max-w-full overflow-auto">
                <CodeSyntax codeSnippet={option.content} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deployment;
