import { NextResponse } from "next/server";
import { getItems, updateSetting, getSetting } from "@/lib/db";

export const dynamic = "force-dynamic";

const DEFAULT_AUTOMATION_CONFIG = {
  preset: "0 1 * * *",
  cronExpression: "0 1 * * *",
  query: "Coffee Shop Bandung",
  limit: 10,
  autoTelegram: true,
  enabled: true,
  lastRun: null,
  lastStatus: "Ready",
  lastLeadsCount: 0,
};

export async function GET() {
  try {
    const rawConfig = await getSetting("automation_config");
    let config = DEFAULT_AUTOMATION_CONFIG;

    if (rawConfig) {
      try {
        config = typeof rawConfig === "string" ? JSON.parse(rawConfig) : rawConfig;
      } catch (e) {
        console.error("Failed to parse automation_config:", e);
      }
    }

    return NextResponse.json(config, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("GET /api/automation error:", error);
    return NextResponse.json(
      { error: "Failed to fetch automation config" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const currentConfigRaw = await getSetting("automation_config");
    let currentConfig = DEFAULT_AUTOMATION_CONFIG;

    if (currentConfigRaw) {
      try {
        currentConfig = typeof currentConfigRaw === "string" ? JSON.parse(currentConfigRaw) : currentConfigRaw;
      } catch (e) {}
    }

    const updatedConfig = {
      ...currentConfig,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await updateSetting("automation_config", JSON.stringify(updatedConfig));

    return NextResponse.json({
      success: true,
      message: "Automation settings saved successfully",
      config: updatedConfig,
    });
  } catch (error) {
    console.error("POST /api/automation error:", error);
    return NextResponse.json(
      { error: "Failed to save automation config" },
      { status: 500 }
    );
  }
}
