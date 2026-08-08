import io
import base64
import qrcode

def generate_qr_code(url: str):
    img = qrcode.make(url)

    buffer = io.BytesIO()
    img.save(buffer, format="PNG")

    return "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()