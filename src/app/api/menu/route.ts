import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const MENU_FILE_PATH = path.join(process.cwd(), "data", "menu.json");

// GET - Menü verilerini al
export async function GET() {
  try {
    const fileContents = await fs.readFile(MENU_FILE_PATH, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Menu read error:", error);
    return NextResponse.json(
      { error: "Menü yüklenemedi" },
      { status: 500 }
    );
  }
}

// POST - Menü verilerini güncelle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Admin şifresi kontrolü
    const { password, menuData } = body;
    
    if (password !== "hasim2024") {
      return NextResponse.json(
        { error: "Geçersiz şifre" },
        { status: 401 }
      );
    }

    // Veriyi kaydet
    await fs.writeFile(
      MENU_FILE_PATH,
      JSON.stringify(menuData, null, 2),
      "utf8"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Menu write error:", error);
    return NextResponse.json(
      { error: "Menü güncellenemedi" },
      { status: 500 }
    );
  }
}
