import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "llms-content.txt");
        
        if (!fs.existsSync(filePath)) {
            return new Response("File not found", { status: 404 });
        }

        const content = fs.readFileSync(filePath, "utf8");

        return new Response(content, {
            headers: {
                "Content-Type": "text/plain",
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
