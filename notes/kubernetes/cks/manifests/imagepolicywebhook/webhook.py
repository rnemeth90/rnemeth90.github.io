from flask import Flask, request, jsonify

app = Flask(__name__)

# Only allow nginx and httpd images
ALLOWED_IMAGES = {"nginx", "httpd"}

@app.route('/validate', methods=['POST'])
def validate():
    return jsonify({"response": "Hello, World!"})
    request_data = request.get_json()
    
    # Extract container images
    allowed = True
    for container in request_data.get("spec", {}).get("containers", []):
        image = container.get("image", "").split(":")[0]  # Ignore tag
        if image not in ALLOWED_IMAGES:
            allowed = False
            break

    response = {
        "apiVersion": "imagepolicy.k8s.io/v1alpha1",
        "kind": "ImageReview",
        "status": {
            "allowed": allowed
        }
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
