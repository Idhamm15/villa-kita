import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";

    const skip = (page - 1) * limit;

    const where = {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          slug: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const [data, total] = await Promise.all([
      prisma.categoryProduct.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.categoryProduct.count({
        where,
      }),
    ]);

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {

    return NextResponse.json({
      status: false,
      code: 500,
      message: "Internal Server Error"
    }, {
      status:500
    });

  }
}

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      name,
      slug,
      description
    } = body;

    if(!name || !slug){

      return NextResponse.json({
        status:false,
        code:400,
        message:"Name dan slug wajib diisi."
      },{
        status:400
      });

    }

    const exist = await prisma.categoryProduct.findFirst({
      where:{
        OR:[
          {
            name
          },
          {
            slug
          }
        ]
      }
    });

    if(exist){

      return NextResponse.json({
        status:false,
        code:400,
        message:"Kategori sudah ada."
      },{
        status:400
      });

    }

    const category = await prisma.categoryProduct.create({

      data:{
        name,
        slug,
        description
      }

    });

    return NextResponse.json({

      status:true,
      code:201,
      message:"Kategori berhasil dibuat.",
      data:category

    },{
      status:201
    });

  } catch (error) {

    return NextResponse.json({

      status:false,
      code:500,
      message:"Internal Server Error"

    },{
      status:500
    });

  }

}