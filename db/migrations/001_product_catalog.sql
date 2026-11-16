CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(180) NOT NULL UNIQUE,
  name VARCHAR(180) NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN (
      'Lightning Protection',
      'Earthing',
      'Accessories',
      'Cable Management',
      'Services'
    )
  ),
  price NUMERIC(12, 2) CHECK (price IS NULL OR price >= 0),
  product_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_category_name_idx
  ON products (category, name);
