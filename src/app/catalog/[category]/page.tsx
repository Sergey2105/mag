// import Link from "next/link";

// interface Props {
//     params: Promise<{ category: string }>;
// }

// export default async function CategoryPage({ params }: Props) {
//     // Ожидаем параметры
//     const { category } = await params;

//     console.log(category);

//     return (
//         <div>
//             {/* Хлебные крошки */}
//             <nav>
//                 <Link href="/">Главная</Link> / <Link href="/catalog">Каталог</Link> / {category.toUpperCase()}
//             </nav>

//             <h1>Категория: {category}</h1>
//         </div>
//     );
// }

import Category from "@/components/pages/Category";
import Link from "next/link";

interface Props {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;

    console.log(category);

    return <Category />;
}
