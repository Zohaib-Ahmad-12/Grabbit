CREATE TABLE IF NOT EXISTS notes (
    id serial Primary key,
    title VARCHAR(50) NOT NULL,
    text Text NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()


);



