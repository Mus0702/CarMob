//package com.azoudmustafa.mapper;
//
//import com.azoudmustafa.dto.user.UserPostDTO;
//import com.azoudmustafa.mapper.user.UserMapper;
//import com.azoudmustafa.model.User;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//class UserDTOImplTest {
//
//    @Mock
//    private UserPostDTO mockUserDTO;
//
//    @InjectMocks
//    private UserMapper userMapper;
//
//
//    @Test
//    void testToEntity() {
//
//        when(mockUserDTO.id()).thenReturn(1);
//        when(mockUserDTO.lastname()).thenReturn("Azoud");
//        when(mockUserDTO.firstname()).thenReturn("Mustafa");
//        when(mockUserDTO.password()).thenReturn("mustafa");
//
//        User user = userMapper.toEntity(mockUserDTO);
//
//        assertEquals(1, user.getId());
//        assertEquals("Azoud", user.getLastname());
//        assertEquals("Mustafa", user.getFirstname());
//        assertEquals("mustafa", user.getPassword());
//    }
//
//    @Test
//    void testToDTO() {
//
//        User user = new User();
//        user.setId(1);
//        user.setLastname("Azoud");
//        user.setFirstname("Mustafa");
//        user.setPassword("mustafa");
//
//        UserPostDTO userDTO = userMapper.toPostDTO(user);
//
//        assertEquals(1, userDTO.id());
//        assertEquals("Azoud", userDTO.lastname());
//        assertEquals("Mustafa", userDTO.firstname());
//        assertEquals("mustafa", userDTO.password());
//    }
//
//}