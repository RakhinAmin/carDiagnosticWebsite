# Import necessary modules for user management and customization
# Import the base user manager class from Django
from django.contrib.auth.base_user import BaseUserManager
# Import an exception for validation errors
from django.core.exceptions import ValidationError
# Import a function for validating email addresses
from django.core.validators import validate_email
# Import a utility for lazy method translation of strings
from django.utils.translation import gettext_lazy as _

# Define a custom user manager class that extends the BaseUserManager


class CustomUserManager(BaseUserManager):

    # Define a custom email validator method
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:  # Raise validation error message if validation fails
            raise ValueError(_("You must provide a valid email"))

    # Define a method to create a regular user using the necessary form fields
    def create_user(self, first_name, last_name, email, password, **extra_fields):
        # Validate first name
        if not first_name:
            raise ValueError(_("Users must submit a first name"))

        # Validate last name
        if not last_name:
            raise ValueError(_("Users must submit a last name"))

        # Validate and normalize email
        if email:
            # Normalisation done to ensure email is in standard format
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("Base User: an email address is required"))

        # Create a new user model referencing user manager user model (allows efficient grabbing of user model and any similar instances of it)
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            **extra_fields,  # Allows additional fields to be added
        )

        # Set the password and default fields and states
        user.set_password(password)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        # Save the user instance
        user.save()

        return user

    # Define a method to create a superuser
    def create_superuser(self, first_name, last_name, email, password, **extra_fields):
        # Set default values for superuser
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        # Validate is_superuser and is_staff values
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superusers must have is_superuser = True"))

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superusers must have is_staff = True"))

        # Validate first name
        if not first_name:
            raise ValueError(_("Users must submit a first name"))

        # Validate last name
        if not last_name:
            raise ValueError(_("Users must submit a last name"))

        # Validate and normalize email
        if email:
            # Normalisation done to ensure email is in standard format
            email = self.normalize_email(email)
            self.email_validator(email)  # Email is validated
        else:
            raise ValueError(_("Admin User: an email address is required"))

        # Create a new superuser model referencing user manager user model (allows efficient grabbing of user model and any similar instances of it)
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            **extra_fields,  # Allows additional fields to be added to model
        )

        # Create the superuser using the create_user method
        user = self.create_user(first_name, last_name,
                                email, password, **extra_fields)

        # Save the superuser instance
        user.save()

        return user
