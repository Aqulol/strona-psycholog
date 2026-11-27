CREATE TABLE IF NOT EXISTS counters (
  day TEXT NOT NULL,
  event TEXT NOT NULL CHECK (event IN ('booking_click','phone_click','email_click','contact_submit_success','pricing_click')),
  total INTEGER NOT NULL CHECK (total > 0),
  PRIMARY KEY (day, event)
) WITHOUT ROWID;
