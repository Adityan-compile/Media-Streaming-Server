import pytest
from models.User import User
from utils.bcrypt import compare_passsword
import nanoid


class TestAuthServer:

    def always_pass(self):
        assert True

    def always_fail(self):
        assert False

    def test_create_user(self):
        test_uname = "test"
        test_password = "test"
        test_id = nanoid.generate(size=20)
        created_user = User(id= test_id,name=test_uname, password=test_password)
        errors = []
        if created_user.name != test_uname:
            errors.append("User Name Does Not Match the Input")
        if not compare_passsword(created_user.password, test_password):
            errors.append("Password Does Not Match the Input")
        if created_user.id != test_id:
            errors.append("Test Id Does not Match")
        
        if len(errors) > 0:
            assert False, "The Following Errors Occured: \n".join(errors)
        else:
            assert True

