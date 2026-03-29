# 🗣️ TulayTalk

### A Cross-Generational Filipino–English Language Bridge System

---

## 📌 Overview

**TulayTalk** is a web-based linguistic system designed to **bridge communication gaps across generations** by mapping expressions with the same meaning but different usage across:

* Generation Alpha
* Generation Z
* Generation X

Instead of functioning as a traditional translator, TulayTalk focuses on **meaning-based mapping**, helping users understand how different generations express the same idea in different ways.

---

## 🎯 Objectives

* Bridge communication gaps between generations
* Provide **context-aware meaning mapping**
* Improve understanding of modern and traditional expressions
* Preserve linguistic diversity in Filipino–English communication
* Support research in **computational sociolinguistics**

---

## 🚀 Key Features

### 🔄 Cross-Generational Translator (Main Feature)

* Input a word, phrase, or sentence
* Select source generation → target generation
* Outputs equivalent expressions based on shared meaning

Example:

Input:
"cap"

Output:
Meaning: False / Not true

| Gen Alpha | Gen Z           | Gen X             |
| --------- | --------------- | ----------------- |
| cap       | fake / not real | "that’s not true" |

---

### 🧠 Meaning-Based Mapping Engine

* Groups expressions by **core meaning**
* Links multiple generational expressions to a single concept
* Supports contextual interpretation

---

### 📊 Multi-Column Comparison Interface

* Displays expressions across generations side-by-side
* Highlights differences in tone, style, and usage

---

### 💬 Context-Aware Explanation

Each expression includes:

* Meaning
* Tone (casual, sarcastic, serious)
* Usage context
* Example sentence

---

### 📚 Slang & Expression Dictionary

* Searchable database of generational expressions
* Organized by meaning groups instead of direct translation

---

### ✍️ User Contribution System

* Users can submit new slang or expressions
* Assign generation and meaning
* Entries go through admin moderation

---

### 🛠️ Admin Dashboard

* Approve or reject submissions
* Manage meaning groups and expressions
* Monitor usage and trends
* Maintain linguistic consistency

---

## 🧩 System Architecture

### 🔹 Input

* User-entered text
* Selected generation (source & target)
* User-submitted slang

### 🔹 Process

* Text preprocessing (tokenization, normalization)
* Rule-based slang detection (RegEx)
* Meaning identification
* Generational mapping
* Context extraction

### 🔹 Output

* Equivalent expressions across generations
* Meaning explanation
* Contextual usage

---

## 🏗️ Tech Stack

### Backend

* Python (Flask)

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (jQuery)

### Database

* SQLite
* SQLAlchemy (ORM)

### NLP Techniques

* Rule-Based Processing
* Regular Expressions (RegEx)
* Basic Text Preprocessing

---

## 🔐 Authentication

* User registration and login
* Role-based access control (Admin & User)

### 🔑 Default Admin Account

* **Email:** [admin@tulaytalk.com](mailto:admin@tulaytalk.com)
* **Password:** admin123

---

## 📊 Admin Features

* Manage slang and expressions
* Edit meaning mappings
* Merge duplicate meanings
* View usage statistics:

  * Most searched terms
  * Trending slang
  * Generational usage patterns

---

## 🗄️ Database Design

### Tables:

**meaning_groups**

* id
* core_meaning

**expressions**

* id
* expression
* generation (Gen Alpha / Gen Z / Gen X)
* meaning_id
* tone
* example

**users**

**submissions**

**usage_logs**

---

## 🧪 Evaluation

The system is evaluated based on:

* Translation (mapping) accuracy
* Context relevance
* Response time
* Usability

Aligned with **ISO/IEC 25010**:

* Functional Suitability
* Usability
* Performance Efficiency

---

## ⚙️ Installation Guide

```bash
# Clone repository
git clone https://github.com/your-username/tulaytalk.git

# Navigate to project
cd tulaytalk

# Create virtual environment
python -m venv venv

# Activate environment
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

---

## 📁 Project Structure

```
tulaytalk/
│── static/
│   ├── css/
│   ├── js/
│
│── templates/
│   ├── index.html
│   ├── translator.html
│   ├── dictionary.html
│   ├── admin_dashboard.html
│
│── app.py
│── models.py
│── nlp_engine.py
│── config.py
│── database.db
```

---

## ⚠️ Limitations

* Rule-based NLP may miss complex slang variations
* Context interpretation is limited
* Dependent on quality of slang dataset
* Focused only on selected generations

---

## 🌱 Future Improvements

* Machine Learning-based slang detection
* Sentence-level context understanding
* Voice input and speech translation
* Mobile application version
* Real-time chat translator

---

## 👨‍💻 Proponents

* Francis Mico H. Cabrera
* Jonathan Davis Dy
* Sheloh M. Galler
* Marco Antonio T. Lasaga

---

## 📍 Location

Philippines

---

## 📜 License

This project is developed for academic and research purposes.

---

## 💡 Final Note

TulayTalk is not just a translator — it is a **linguistic bridge** that connects generations through shared meaning, helping users better understand evolving language in the digital age.
