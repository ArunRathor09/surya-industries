CREATE TABLE IF NOT EXISTS product_categories (
  name TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO product_categories (name)
VALUES
  ('Lightning Protection'),
  ('Earthing'),
  ('Accessories'),
  ('Cable Management'),
  ('Services')
ON CONFLICT DO NOTHING;

INSERT INTO product_categories (name)
SELECT DISTINCT category
FROM products
WHERE BTRIM(category) <> ''
ON CONFLICT DO NOTHING;

CREATE UNIQUE INDEX IF NOT EXISTS product_categories_name_lower_idx
  ON product_categories (LOWER(name));

ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_category_check;

ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_category_fkey;

ALTER TABLE products
  ADD CONSTRAINT products_category_fkey
  FOREIGN KEY (category) REFERENCES product_categories (name);
