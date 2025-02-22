import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import { CartItem } from "src/app/components/providers/CartProvider";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const products = body.map((item: CartItem) => ({
    product_id: item.product.id,
    quantity: item.quantity,
  }));
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from("cart")
      .update({ products: [...products] })
      .eq("user_id", user.id);
    return NextResponse.json([], { status: 200 });
  } else {
    return NextResponse.json({ error: "no user" }, { status: 500 });
  }
}
