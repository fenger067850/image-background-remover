export default {
  async fetch(request, env) {
    // 允许跨域
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "POST") {
      try {
        const formData = await request.formData();
        const apiResponse = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          headers: {
            "X-Api-Key": env.REMOVE_BG_API_KEY,
          },
          body: formData,
        });

        if (!apiResponse.ok) {
          const errorText = await apiResponse.text();
          return new Response(`Remove.bg API Error: ${errorText}`, { 
            status: apiResponse.status,
            headers: corsHeaders 
          });
        }

        const imageBuffer = await apiResponse.arrayBuffer();
        return new Response(imageBuffer, {
          headers: {
            ...corsHeaders,
            "Content-Type": "image/png",
          },
        });
      } catch (err) {
        return new Response(`Worker Error: ${err.message}`, { 
          status: 500,
          headers: corsHeaders 
        });
      }
    }

    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  },
};
