INSERT INTO users (
    full_name,
    phone_number,
    email,
    gender,
    password_hash,
    role,
    ward,
    is_anonymous_allowed
) VALUES
-- Citizens
(
    'James Kiptoo',
    '+254712345678',
    'james.kiptoo@example.com',
    'male',
    '$2b$10$eImiTXuWVxfM37uY4JANjQ==',
    'citizen',
    'Kapsoya',
    FALSE
),
(
    'Amina Hassan',
    '+254701234567',
    'amina.hassan@example.com',
    'female',
    '$2b$10$eImiTXuWVxfM37uY4JANjQ==',
    'citizen',
    'Langas',
    FALSE
),

-- Officials
(
    'Peter Mwangi',
    '+254722334455',
    'peter.mwangi@county.go.ke',
    'male',
    '$2b$10$eImiTXuWVxfM37uY4JANjQ==',
    'official',
    'Huruma',
    TRUE
),
(
    'Grace Njeri',
    '+254733445566',
    'grace.njeri@county.go.ke',
    'female',
    '$2b$10$eImiTXuWVxfM37uY4JANjQ==',
    'official',
    'Pioneer',
    TRUE
),

-- Moderators
(
    'Daniel Otieno',
    '+254744556677',
    'daniel.otieno@tuwaze.org',
    'male',
    '$2b$10$eImiTXuWVxfM37uY4JANjQ==',
    'moderator',
    NULL,
    TRUE
),

-- Legal Aid
(
    'Lucy Wambui',
    '+254755667788',
    'lucy.wambui@legalaid.org',
    'female',
    '$2b$10$eImiTXuWVxfM37uY4JANjQ==',
    'legal_aid',
    NULL,
    FALSE
);
