(function () {
  const widgetId = document.currentScript.getAttribute("data-widget-id");
  if (!widgetId) {
    console.error("Chatbot widget: missing data-widget-id attribute");
    return;
  }

  // Prevent multiple widgets
  if (document.getElementById("chat-widget-iframe-wrapper")) return;

  // Create iframe wrapper
  const iframeWrapper = document.createElement("div");
  iframeWrapper.id = "chat-widget-iframe-wrapper";
  Object.assign(iframeWrapper.style, {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    zIndex: "10",
    display: "none",
    opacity: "0",
    transform: "translateY(20px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    width: "90vw",
    maxWidth: "400px",
    height: "80vh",
    maxHeight: "600px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    overflow: "hidden",
  });

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = `http://localhost:3000/embed/${widgetId}`;
  Object.assign(iframe.style, {
    width: "100%",
    height: "100%",
    border: "none",
  });
  iframeWrapper.appendChild(iframe);

  // Create bubble button
  const bubble = document.createElement("button");
  bubble.setAttribute("aria-label", "Toggle chat widget");
  bubble.innerText = "💬";
  Object.assign(bubble.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "20",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#007aff",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "transform 0.2s, background-color 0.3s",
  });

  bubble.addEventListener("mouseenter", () => {
    bubble.style.transform = "scale(1.1)";
    bubble.style.backgroundColor = "#3b82f6";
  });
  bubble.addEventListener("mouseleave", () => {
    bubble.style.transform = "scale(1)";
    bubble.style.backgroundColor = "#007aff";
  });

  let isOpen = false;
  let animating = false;

  const openChat = () => {
    bubble.innerText = "X";
    iframeWrapper.style.display = "block";
    requestAnimationFrame(() => {
      iframeWrapper.style.opacity = "1";
      iframeWrapper.style.transform = "translateY(0)";
    });
    setTimeout(() => (animating = false), 300);
    isOpen = true;
  };

  const closeChat = () => {
    bubble.innerText = "💬";
    iframeWrapper.style.opacity = "0";
    iframeWrapper.style.transform = "translateY(20px)";
    setTimeout(() => {
      iframeWrapper.style.display = "none";
      animating = false;
    }, 300);
    isOpen = false;
  };

  bubble.addEventListener("click", () => {
    if (animating) return;
    animating = true;
    isOpen ? closeChat() : openChat();
  });

  // Close chat when clicking outside
  document.addEventListener("click", (event) => {
    if (!isOpen || animating) return;

    if (
      !iframeWrapper.contains(event.target) &&
      !bubble.contains(event.target)
    ) {
      animating = true;
      closeChat();
    }
  });

  document.body.appendChild(iframeWrapper);
  document.body.appendChild(bubble);
})();
