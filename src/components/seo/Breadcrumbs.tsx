import Link from "next/link";
import { SchemaScript } from "./SchemaScript";
import { breadcrumbListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items.map((item) => ({
    name: item.name,
    url: absoluteUrl(item.href),
  }));

  return (
    <>
      <SchemaScript
        schema={breadcrumbListSchema(schemaItems)}
        id="breadcrumbs"
      />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-text-secondary">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-white font-medium"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-text-secondary">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
