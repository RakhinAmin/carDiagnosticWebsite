# Import necessary modules for defining the user model and defining user management
from django.db import models  # For creating model fields
# For building a custom user model
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
# Lazy method translation of strings
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager  # Customer user manager module


# Define the custom user model, inheriting from AbstractBaseUser and PermissionsMixin
class User(AbstractBaseUser, PermissionsMixin):

    # Define a character field for the first name of the user
    first_name = models.CharField(_("First Name"), max_length=50)

    # Define a character field for the last name of the user
    last_name = models.CharField(_("Last Name"), max_length=100)

    # Define a character field for the email address of the user, with unique constraint
    email = models.CharField(_("Email Address"), max_length=254, unique=True)

    # Define a boolean field indicating whether the user is a staff member
    is_staff = models.BooleanField(default=False)

    # Define a boolean field indicating whether the user is active
    is_active = models.BooleanField(default=False)

    # Define a datetime field for the date the user joined, with auto_now_add set to True
    date_joined = models.DateTimeField(auto_now=False, auto_now_add=True)

    # Sets the email field as the unique identifier for authentication
    USERNAME_FIELD = "email"

    # Specify additional fields required when creating a user
    REQUIRED_FIELDS = ["first_name", "last_name"]

    # Assign an instance of the custom user manager to the objects attribute to provide methods for creating and managing users
    objects = CustomUserManager()

    # Configure metadata for the model, specifying human-readable names
    class Meta:
        verbose_name = _("User")  # Single name
        verbose_name_plural = _("Users")  # Plural name

    # Define a method for obtaining the string representation of the user email (email is used as a unique identifier)
    def __str__(self) -> str:
        return self.email

    # Define a property method for obtaining the full name of the user by attaching first and last name together
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
