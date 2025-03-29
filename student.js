// Store student information
let studentInfo = {
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    initials: "",
    personalInfo: {
        dob: "",
        phone: "",
        address: ""
    },
    emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
        email: ""
    }
};

// Function to extract student info from email
function extractStudentInfo(email) {
    if (!email || !email.includes('@vit.edu')) {
        return false;
    }
    
    // Extract the part before @vit.edu
    const namePart = email.split('@')[0];
    
    // Split by dot to get first name and last name+number
    const nameParts = namePart.split('.');
    
    if (nameParts.length < 2) {
        return false;
    }
    
    // Extract first name
    let firstName = nameParts[0];
    // Capitalize first letter
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    
    // Extract last name (remove numbers)
    let lastName = nameParts[1].replace(/[0-9]/g, '');
    // Capitalize first letter
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    
    // Set student info
    studentInfo.email = email;
    studentInfo.firstName = firstName;
    studentInfo.lastName = lastName;
    studentInfo.fullName = `${firstName} ${lastName}`;
    studentInfo.initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    
    return true;
}

// Handle login
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // Extract student info from email
    if (!extractStudentInfo(email)) {
        alert('Please enter a valid VIT email (e.g., firstname.lastname24@vit.edu)');
        return;
    }
    
    // Save email to localStorage
    localStorage.setItem('studentEmail', email);
    
    // Update UI with student info
    updateUIWithStudentInfo();
    
    // Hide login modal
    document.getElementById('loginModal').style.display = 'none';
    
    // Redirect to student dashboard
    window.location.href = 'student.html';
}

// Update UI with student info
function updateUIWithStudentInfo() {
    // Update welcome message
    document.getElementById('studentFirstName').textContent = studentInfo.firstName;
    
    // Update user initials in avatar
    document.getElementById('userInitials').textContent = studentInfo.initials;
    document.getElementById('profileInitials').textContent = studentInfo.initials;
    
    // Update profile information
    document.getElementById('studentFullName').textContent = studentInfo.fullName;
    document.getElementById('studentEmail').textContent = studentInfo.email;
    document.getElementById('studentEmailEdit').textContent = studentInfo.email;
    
    // Load saved personal information if available
    loadUserData();
}

// Load user's saved data from localStorage
function loadUserData() {
    const userDataKey = `userData_${studentInfo.email}`;
    const savedData = localStorage.getItem(userDataKey);
    
    if (savedData) {
        const userData = JSON.parse(savedData);
        
        // Update studentInfo object with saved data
        if (userData.personalInfo) {
            studentInfo.personalInfo = userData.personalInfo;
        }
        
        if (userData.emergencyContact) {
            studentInfo.emergencyContact = userData.emergencyContact;
        }
        
        // Update personal info display
        updatePersonalInfoDisplay();
        
        // Update emergency contact display
        updateEmergencyContactDisplay();
    }
}

// Update personal info display with current data
function updatePersonalInfoDisplay() {
    const personal = studentInfo.personalInfo;
    
    // Update display elements
    document.getElementById('dobDisplay').textContent = personal.dob || 'Not provided';
    document.getElementById('phoneDisplay').textContent = personal.phone || 'Not provided';
    document.getElementById('addressDisplay').textContent = personal.address || 'Not provided';
    
    // Update form inputs
    document.getElementById('dobInput').value = personal.dob || '';
    document.getElementById('phoneInput').value = personal.phone || '';
    document.getElementById('addressInput').value = personal.address || '';
}

// Update emergency contact display with current data
function updateEmergencyContactDisplay() {
    const emergency = studentInfo.emergencyContact;
    
    // Update display elements
    document.getElementById('emergencyNameDisplay').textContent = emergency.name || 'Not provided';
    document.getElementById('emergencyRelationDisplay').textContent = emergency.relationship || 'Not provided';
    document.getElementById('emergencyPhoneDisplay').textContent = emergency.phone || 'Not provided';
    document.getElementById('emergencyEmailDisplay').textContent = emergency.email || 'Not provided';
    
    // Update form inputs
    document.getElementById('emergencyNameInput').value = emergency.name || '';
    document.getElementById('emergencyRelationInput').value = emergency.relationship || '';
    document.getElementById('emergencyPhoneInput').value = emergency.phone || '';
    document.getElementById('emergencyEmailInput').value = emergency.email || '';
}

// Save user data to localStorage
function saveUserData() {
    const userDataKey = `userData_${studentInfo.email}`;
    const userData = {
        personalInfo: studentInfo.personalInfo,
        emergencyContact: studentInfo.emergencyContact
    };
    
    localStorage.setItem(userDataKey, JSON.stringify(userData));
}

// Save personal information
function savePersonalInfo() {
    studentInfo.personalInfo.dob = document.getElementById('dobInput').value;
    studentInfo.personalInfo.phone = document.getElementById('phoneInput').value;
    studentInfo.personalInfo.address = document.getElementById('addressInput').value;
    
    // Save data
    saveUserData();
    
    // Update display
    updatePersonalInfoDisplay();
    
    // Toggle view/edit mode
    togglePersonalInfoEdit(false);
}

// Save emergency contact information
function saveEmergencyContact() {
    studentInfo.emergencyContact.name = document.getElementById('emergencyNameInput').value;
    studentInfo.emergencyContact.relationship = document.getElementById('emergencyRelationInput').value;
    studentInfo.emergencyContact.phone = document.getElementById('emergencyPhoneInput').value;
    studentInfo.emergencyContact.email = document.getElementById('emergencyEmailInput').value;
    
    // Save data
    saveUserData();
    
    // Update display
    updateEmergencyContactDisplay();
    
    // Toggle view/edit mode
    toggleEmergencyContactEdit(false);
}

// Toggle personal information edit mode
function togglePersonalInfoEdit(showEdit) {
    const viewMode = document.getElementById('personalInfoView');
    const editMode = document.getElementById('personalInfoEdit');
    const editBtn = document.getElementById('editPersonalBtn');
    const saveBtn = document.getElementById('savePersonalBtn');
    
    if (showEdit) {
        // Show edit mode
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
    } else {
        // Show view mode
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
    }
}

// Toggle emergency contact edit mode
function toggleEmergencyContactEdit(showEdit) {
    const viewMode = document.getElementById('emergencyInfoView');
    const editMode = document.getElementById('emergencyInfoEdit');
    const editBtn = document.getElementById('editEmergencyBtn');
    const saveBtn = document.getElementById('saveEmergencyBtn');
    
    if (showEdit) {
        // Show edit mode
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
    } else {
        // Show view mode
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('dashboard-content').style.display = 'block';
    document.getElementById('profile-content').style.display = 'none';
    
    // Update active menu item
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    menuItems[0].classList.add('active');
}

// Show profile
function showProfile() {
    document.getElementById('dashboard-content').style.display = 'none';
    document.getElementById('profile-content').style.display = 'block';
    
    // Update active menu item
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    menuItems[1].classList.add('active');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Get email from localStorage
    const studentEmail = localStorage.getItem('studentEmail');
    
    if (studentEmail) {
        // Use the email to extract student info
        if (extractStudentInfo(studentEmail)) {
            updateUIWithStudentInfo();
            showDashboard();
            
            // Set up event listeners for edit/save buttons
            setupEventListeners();
        } else {
            // Handle invalid email format
            console.error("Invalid email format:", studentEmail);
            // Redirect to login page
            window.location.href = 'index.html';
        }
    } else {
        // No email found, user is not logged in
        // Redirect to login page
        window.location.href = 'index.html';
    }
});

// Set up event listeners
function setupEventListeners() {
    // Personal Info Edit/Save
    document.getElementById('editPersonalBtn').addEventListener('click', function() {
        togglePersonalInfoEdit(true);
    });
    
    document.getElementById('savePersonalBtn').addEventListener('click', function() {
        savePersonalInfo();
    });
    
    // Emergency Contact Edit/Save
    document.getElementById('editEmergencyBtn').addEventListener('click', function() {
        toggleEmergencyContactEdit(true);
    });
    
    document.getElementById('saveEmergencyBtn').addEventListener('click', function() {
        saveEmergencyContact();
    });
}