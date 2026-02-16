import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    // Dosya validasyonu
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Sadece JPG, PNG ve WebP desteklenir" },
        { status: 400 }
      );
    }

    // Dosyayı buffer olarak al
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload klasörünü oluştur
    const uploadDir = path.join(process.cwd(), "public", "menu-images");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const filepath = path.join(uploadDir, filename);

    // Sharp ile resize ve optimize et (400x400px, 80% kalite)
    await sharp(buffer)
      .resize(400, 400, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 80 })
      .toFile(filepath);

    // Public URL döndür
    const imageUrl = `/menu-images/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: imageUrl 
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Dosya yüklenemedi" },
      { status: 500 }
    );
  }
}
