"use client";

import { ProductDialog } from "@/components/product/product-dialog";
import { useLanguage } from "@/components/providers";
import { getProductCategoryLabel, type Product } from "@/data/products";

export function ProductCompareDialog({
  products,
  onClose,
}: {
  products: Product[];
  onClose: () => void;
}) {
  const { text } = useLanguage();
  const specs = Array.from(
    new Set(products.flatMap((product) => product.specifications.map((spec) => spec.label))),
  );

  return (
    <ProductDialog
      onClose={onClose}
      open={products.length > 0}
      title={text.catalog.comparison}
      size="max-w-6xl"
    >
      {products.length < 2 ? (
        <p className="p-6 text-sm text-slate-600 ">
          {text.catalog.emptyCompare}
        </p>
      ) : (
        <div className="overflow-x-auto p-4 sm:p-6">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 min-w-36 bg-white p-3 font-semibold text-slate-500  ">
                  {text.catalog.field}
                </th>
                {products.map((product) => (
                  <th
                    className="min-w-52 border-b border-slate-200 p-3 align-top "
                    key={product.slug}
                  >
                    <p className="font-heading text-sm font-semibold leading-5 text-slate-950 ">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[10px] font-medium text-brand-purple ">
                      {getProductCategoryLabel(product.category, text.catalog.categories)}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((label) => (
                <tr className="border-b border-slate-100 " key={label}>
                  <th className="sticky left-0 bg-white p-3 text-left font-medium text-slate-500  ">
                    {label}
                  </th>
                  {products.map((product) => {
                    const value = product.specifications.find((spec) => spec.label === label)?.value;
                    return (
                      <td className="p-3 leading-5 text-slate-700 " key={product.slug}>
                        {value ?? "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ProductDialog>
  );
}
