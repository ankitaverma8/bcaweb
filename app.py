from flask import Flask, render_template,request,jsonify,redirect,session
import mysql.connector

app = Flask(__name__)
app.config["PROPAGATE_EXCEPTIONS"] = True
app.secret_key = "asdf"

db = mysql.connector.connect(
    host="127.0.0.1",
    user="ankita",
    password="ankita",
    database="bca"
)


conn = db.cursor(dictionary=True)


if(db.is_connected()):
    print("DB connected")
else:
    print("DB error")


@app.route("/", methods=["GET"])
def index():
    return render_template("login.html")

@app.route("/login", methods=["GET"])
def login():
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def loginapi():
    try:
        email = request.form.get("email")
        password = request.form.get("password") 
        print("api hited")
        conn.execute("select * from user where email =%s",[email])
        user = conn.fetchone()
        if(user):
            if(user["password"] == password):
                session["email"] = user["email"]
                return jsonify({"success": True})
            return jsonify({"success": False, "message": "Wrong email/password"})
        return jsonify({"success": False, "message": "User not found"})
    except Exception as e:
        print("Error", e)
        return jsonify({"success":False, "message": str(e)})


@app.route("/register", methods=["GET"])
def register():
    return render_template("register.html")

@app.route("/register", methods=["POST"])
def registerapi():
    try:
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")

        conn.execute("insert into user (name,email,password) values (%s,%s,%s)",[name,email,password])
        db.commit()
        return jsonify({"success": True, "message": "Authenticated successfully", "name":name, "email":email})
    except mysql.connector.Error as e:
        return jsonify({"success":False, "message": str(e)})


@app.route("/home")
def home():
    
    if ('email' in session) :
        email = session["email"]
        conn.execute("select * from user where email =%s",[email])
        user = conn.fetchone()
        return render_template("home.html",user=user)
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500, debug=True)
    