// prisma/seed.ts
import prisma from "@/global/prisma/prisma-clint";
import { UserRole, OrderStatus } from "@prisma/client";

async function main() {
    console.log("🌱 Seeding database...");

    // ---------- USER ----------
    const user = await prisma.user.create({
        data: {
            fullName: "Demo User",
            email: "demo@example.com",
            password: "hashed_password",
            role: UserRole.USER,
        },
    });

    // ---------- CATEGORIES ----------
    const categoriesData = [
        {
            name: "All",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
        },
        {
            name: "Harry Potter",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
        },
        {
            name: "Naruto",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
        },
        {
            name: "Dragon Ball",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
        },
        {
            name: "Marvel",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
        },
        {
            name: "DC Comics",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
        },
    ];

    function makeSlug(name: string) {
        return name
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/[^\p{L}\p{N}\-]+/gu, "")
            .replace(/-+/g, "-");
    }

    const categories = [];

    for (const cat of categoriesData) {
        const created = await prisma.category.create({
            data: {
                ...cat,
                slug: makeSlug(cat.name),
            },
        });

        categories.push(created);
    }
    // ---------- PRODUCTS ----------
    const productsData = [
        // Harry Potter
        {
            name: "Harry Potter",
            category: "Harry Potter",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2990,
        },
        {
            name: "Hermione Grange",
            category: "Harry Potter",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2890,
        },
        // Naruto
        {
            name: "Naruto Uzumaki",
            category: "Naruto",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2890,
        },
        {
            name: "Sasuke Uchiha",
            category: "Naruto",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2500,
        },
        // Dragon Ball
        {
            name: "Goku Super Saiyan",
            category: "Dragon Ball",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2700,
        },
        {
            name: "Vegeta",
            category: "Dragon Ball",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2700,
        },
        // Marvel
        {
            name: "Spider-Man",
            category: "Marvel",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2800,
        },
        {
            name: "Iron Man",
            category: "Marvel",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2890,
        },
        // DC Comics
        {
            name: "Batman",
            category: "DC Comics",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2890,
        },
        {
            name: "Superman",
            category: "DC Comics",
            imageURL:
                "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
            price: 2890,
        },
    ];

    for (const p of productsData) {
        const category = categories.find((c) => c.name === p.category);
        if (!category) continue;

        await prisma.product.create({
            data: {
                name: p.name,
                imageURL: p.imageURL,
                price: p.price,
                description: `${p.name} collectible Funko Pop.`,
                categoryID: category.id,
            },
        });
    }

    // ---------- CART ----------
    const cart = await prisma.cart.create({
        data: {
            userID: user.id,
            token: "demo_cart_token",
        },
    });

    const allProducts = await prisma.product.findMany();

    // ---------- CART ITEMS ----------
    await prisma.cartItem.createMany({
        data: allProducts.slice(0, 3).map((prod) => ({
            cartID: cart.id,
            productID: prod.id,
            quantity: 1,
        })),
    });

    console.log("🌱 Seed completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
