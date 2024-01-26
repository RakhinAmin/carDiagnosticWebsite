# Importing built in django forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User  # Importing additional user model form fields

# Custom form for user registration


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):  # Inherits metadata from UserCreationForm
        model = User
        fields = ["email", "first_name", "last_name"]
        error_class = "error"


# Custom form for changing user information
class CustomUserChangeForm(UserCreationForm):
    class Meta(UserChangeForm.Meta):  # Inherits metadata from UserChangeForm
        model = User
        fields = ["email", "first_name", "last_name"]
        error_class = "error"
